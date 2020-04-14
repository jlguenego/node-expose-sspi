#include <atlenc.h>

#include <iomanip>
#include <iostream>
#include <regex>
#include <sstream>

#include "../../misc.h"

namespace myAddon {

Napi::Value e_GetTokenInformation(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  CHECK_INPUT(
      "GetTokenInformation({\n"
      "accessToken: string,\n"
      "tokenInformationClass: string,\n"
      "filter?: string\n"
      "})",
      1);

  Napi::Object obj = info[0].As<Napi::Object>();

  HANDLE handle = s2p(obj.Get("accessToken").As<Napi::String>().Utf8Value());

  std::string tokenInformationClassStr =
      obj.Get("tokenInformationClass").As<Napi::String>().Utf8Value();

  std::string filter = ".*";
  if (obj.Has("filter")) {
    filter = obj.Get("filter").As<Napi::String>().Utf8Value();
  }
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

    DWORD counter = 0;

    for (DWORD i = 0; i < groupinfo->GroupCount; i++) {
      DWORD grouplen = _MAX_PATH;
      DWORD domainlen = _MAX_PATH;
      wchar_t group_name[_MAX_PATH];
      wchar_t domain_name[_MAX_PATH];
      SID_NAME_USE sidtype;
      if (LookupAccountSidW(NULL, groupinfo->Groups[i].Sid, group_name,
                            &grouplen, domain_name, &domainlen, &sidtype)) {
        std::string fullGroupName = plf::wstrtostr(domain_name) +
                                    std::string("\\") +
                                    plf::wstrtostr(group_name);
        log("fullGroupName=%s", fullGroupName.c_str());
        if (!std::regex_match(fullGroupName, std::regex(filter.c_str()))) {
          continue;
        }
        result[std::to_string(counter)] = Napi::String::New(env, fullGroupName);
        counter++;
      }
    }
    free(groupinfo);
    return result;
  }

  throw Napi::Error::New(env, "tokenInformationClass not understood.");
}

}  // namespace myAddon
