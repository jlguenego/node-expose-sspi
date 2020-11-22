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

  CHECK_PROP(obj, "accessToken", IsString);
  HANDLE accessTokenHandle =
      s2p(obj.Get("accessToken").As<Napi::String>().Utf8Value());

  CHECK_PROP(obj, "tokenInformationClass", IsString);
  std::string tokenInformationClassStr =
      obj.Get("tokenInformationClass").As<Napi::String>().Utf8Value();

  std::string filter = ".*";
  if (obj.Has("filter")) {
    if (!obj.Get("filter").IsString()) {
      throw Napi::Error::New(
          env, "Cannot GetTokenInformation: filter must be a string");
    }
    filter = obj.Get("filter").As<Napi::String>().Utf8Value();
  }
  if (tokenInformationClassStr == "TokenGroups") {
    TOKEN_GROUPS* groupinfo = NULL;
    DWORD groupinfosize = 0;
    BOOL status = GetTokenInformation(accessTokenHandle, TokenGroups, groupinfo,
                                      groupinfosize, &groupinfosize);
    if (status == FALSE && (GetLastError() != ERROR_INSUFFICIENT_BUFFER)) {
      throw Napi::Error::New(
          env,
          "Cannot GetTokenInformation: first call error = " + plf::error_msg());
    }

    groupinfo = (TOKEN_GROUPS*)malloc(groupinfosize);
    status = GetTokenInformation(accessTokenHandle, TokenGroups, groupinfo,
                                 groupinfosize, &groupinfosize);
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

  // privileges
  if (tokenInformationClassStr == "TokenPrivileges") {
    TOKEN_PRIVILEGES* privileges = NULL;
    DWORD bufferSize = 0;
    BOOL status = GetTokenInformation(accessTokenHandle, TokenPrivileges,
                                      privileges, 0, &bufferSize);
    if (status == FALSE && (GetLastError() != ERROR_INSUFFICIENT_BUFFER)) {
      throw Napi::Error::New(
          env,
          "Cannot GetTokenInformation: first call error = " + plf::error_msg());
    }

    privileges = (TOKEN_PRIVILEGES*)malloc(bufferSize);
    status = GetTokenInformation(accessTokenHandle, TokenPrivileges, privileges,
                                 bufferSize, &bufferSize);
    if (status == FALSE) {
      throw Napi::Error::New(
          env, "Cannot GetTokenInformation: second call error = " +
                   plf::error_msg());
    }

    Napi::Object result = Napi::Object::New(env);

    DWORD counter = 0;

    for (DWORD i = 0; i < privileges->PrivilegeCount; i++) {
      DWORD privilegeLen = _MAX_PATH;
      wchar_t privilegeName[_MAX_PATH];
      BOOL status = LookupPrivilegeName(
          NULL,  // NULL = privilege on the local system
          &(privileges->Privileges[i].Luid),  // LUID pointer
          privilegeName,  // Receive the string privilege name
          &privilegeLen   // Effective length of the privilegeName);
      );
      if (!status) {
        continue;
      }

      Napi::Array array = setFlags(env, USER_PRIVILEGE_FLAGS,
                                   privileges->Privileges[i].Attributes);
      result[plf::wstrtostr(privilegeName)] = array;
      counter++;
    }
    free(privileges);
    return result;
  }

  throw Napi::Error::New(env, "tokenInformationClass not understood.");
}  // namespace myAddon

}  // namespace myAddon
