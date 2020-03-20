#include "../misc.h"

#include <atlenc.h>
#include <atlstr.h>
#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Value e_GetTokenInformation(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    throw Napi::Error::New(env,
                           "GetTokenInformation: Wrong number of arguments. "
                           "GetTokenInformation(accessToken: string, "
                           "tokenInformationClass: string)");
  }

  HANDLE handle = s2p(info[0].As<Napi::String>().Utf8Value());

  std::string tokenInformationClassStr = info[1].As<Napi::String>().Utf8Value();
  if (tokenInformationClassStr == "TokenGroups") {
    TOKEN_GROUPS* groupinfo = NULL;
    DWORD groupinfosize = 0;
    BOOL status = GetTokenInformation(handle, TokenGroups, groupinfo,
                                      groupinfosize, &groupinfosize);
    if (status == FALSE && (GetLastError() != ERROR_INSUFFICIENT_BUFFER)) {
      throw Napi::Error::New(
          env,
          "Cannot GetTokenInformation: first call error = " + plf::error_msg());
    }

    groupinfo = (TOKEN_GROUPS*)malloc(groupinfosize);
    status = GetTokenInformation(handle, TokenGroups, groupinfo, groupinfosize,
                                 &groupinfosize);
    if (status == FALSE) {
      throw Napi::Error::New(
          env, "Cannot GetTokenInformation: second call error = " +
                   plf::error_msg());
    }

    Napi::Array result = Napi::Array::New(env);

    for (DWORD i = 0; i < groupinfo->GroupCount; i++) {
      DWORD grouplen = _MAX_PATH;
      DWORD domainlen = _MAX_PATH;
      wchar_t group_name[_MAX_PATH];
      wchar_t domain_name[_MAX_PATH];
      SID_NAME_USE sidtype;
      if (LookupAccountSidW(NULL, groupinfo->Groups[i].Sid, group_name,
                            &grouplen, domain_name, &domainlen, &sidtype)) {
        std::string grpNm = std::string(CW2A(domain_name, CP_UTF8)) +
                            std::string("\\") +
                            std::string(CW2A(group_name, CP_UTF8));
        result[std::to_string(i)] = Napi::String::New(env, grpNm);
      }
    }
    free(groupinfo);
    return result;
  }

  throw Napi::Error::New(env, "tokenInformationClass not understood.");
}

}  // namespace myAddon
