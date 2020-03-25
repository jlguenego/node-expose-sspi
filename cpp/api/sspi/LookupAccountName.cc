#include "../../misc.h"
#include "sddl.h"

namespace myAddon {

Napi::Value e_LookupAccountName(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env,
                           "LookupAccountName: Wrong number of arguments. "
                           "LookupAccountName(username: string)");
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
    throw Napi::Error::New(env, "LookupAccountName: error = " + plf::error_msg());
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
    throw Napi::Error::New(env, "LookupAccountName: error = " + plf::error_msg());
  }

  Napi::Object result = Napi::Object::New(env);
  result["domain"] =
      Napi::String::New(env, (char16_t*)ReferencedDomainName);

  LPTSTR StringSid;
  ConvertSidToStringSid(pSid, &StringSid);
  result["sid"] = Napi::String::New(env, (char16_t*)StringSid);
  LocalFree(StringSid);

  delete pSid;
  delete ReferencedDomainName;

  return result;
}

}  // namespace myAddon
