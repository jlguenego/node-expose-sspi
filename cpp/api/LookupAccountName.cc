#include "../misc.h"
#include "sddl.h"

namespace myAddon {

Napi::Value e_LookupAccountName(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env,
                           "LookupAccountName: Wrong number of arguments. "
                           "LookupAccountName({ credential, "
                           "LookupAccountName, serverContextHandle })");
  }

  std::u16string accountName = info[0].As<Napi::String>();
  LPWSTR lpAccountName = (LPWSTR)accountName.c_str();

  DWORD cbSid = 0;
  DWORD cchReferencedDomainName = 0;
  SID_NAME_USE eUse;

  // first call
  BOOL status = LookupAccountName(NULL, lpAccountName, /* Sid */ NULL, &cbSid,
                                  /* ReferencedDomainName */ NULL,
                                  &cchReferencedDomainName, &eUse);
  if (status == FALSE && GetLastError() != ERROR_INSUFFICIENT_BUFFER) {
    std::string msg =
        plf::string_format("LookupAccountName: error 0x%08x", GetLastError());
    throw Napi::Error::New(env, msg);
  }

  BYTE* pSid = new BYTE[cbSid];
  LPWSTR ReferencedDomainName = new TCHAR[cchReferencedDomainName];

  // second call
  status =
      LookupAccountName(NULL, lpAccountName, pSid, &cbSid, ReferencedDomainName,
                        &cchReferencedDomainName, &eUse);
  if (status == FALSE) {
    delete pSid;
    delete ReferencedDomainName;
    std::string msg =
        plf::string_format("LookupAccountName: error 0x%08x", GetLastError());
    throw Napi::Error::New(env, msg);
  }

  Napi::Object result = Napi::Object::New(env);
  result["DomainName"] =
      Napi::String::New(env, (char16_t*)ReferencedDomainName);

  LPTSTR StringSid;
  ConvertSidToStringSid(pSid, &StringSid);
  result["SID"] = Napi::String::New(env, (char16_t*)StringSid);
  LocalFree(StringSid);

  delete pSid;
  delete ReferencedDomainName;

  return result;
}

}  // namespace myAddon
