#include "../../misc.h"

namespace myAddon {

Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "AcquireCredentialsHandle: Wrong number of arguments. "
        "AcquireCredentialsHandle({ packageName: string, authData?: {user: "
        "string, password: string, domain: string} })");
  }

  bool isBasicAuth = false;

  Napi::Object input = info[0].As<Napi::Object>();

  std::u16string packageName = input.Get("packageName").As<Napi::String>();

  SEC_WINNT_AUTH_IDENTITY authData;

  std::u16string domainStr, userStr, passwordStr;

  if (input.Has("authData")) {
    isBasicAuth = true;
    Napi::Object userObj = input.Get("authData").As<Napi::Object>();

    if (!(userObj.Has("domain") && userObj.Has("user") && userObj.Has("password"))) {
      throw Napi::Error::New(
        env,
        "AcquireCredentialsHandle: authData must have 3 properties: {user: "
        "string, password: string, domain: string})");
    }

    domainStr =
        userObj.Get("domain").As<Napi::String>().Utf16Value();
    wchar_t *domain = (wchar_t *)domainStr.c_str();
    authData.Domain = (unsigned short *)domain;
    authData.DomainLength = wcslen(domain);

    userStr =
        userObj.Get("user").As<Napi::String>().Utf16Value();
    wchar_t *user = (wchar_t *)userStr.c_str();
    authData.User = (unsigned short *)user;
    authData.UserLength = wcslen(user);

    passwordStr =
        userObj.Get("password").As<Napi::String>().Utf16Value();
    wchar_t *password = (wchar_t *)passwordStr.c_str();
    authData.Password = (unsigned short *)password;
    authData.PasswordLength = wcslen(password);

    authData.Flags = SEC_WINNT_AUTH_IDENTITY_UNICODE;
  }

  DWORD fCredentialUse = getFlag(env, CREDENTIAL_USE_FLAG, input,
                                 "credentialUse", SECPKG_CRED_BOTH);

  CredHandle credHandle = {0, 0};
  TimeStamp tsExpiry;

  SECURITY_STATUS secStatus = AcquireCredentialsHandle(
      NULL, (LPWSTR)packageName.c_str(), fCredentialUse, NULL,
      isBasicAuth ? &authData : NULL, RESERVED, RESERVED, &credHandle,
      &tsExpiry);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot AcquireCredentialsHandle: secStatus = " +
                                    plf::error_msg(secStatus));
  }

  Napi::Object result = Napi::Object::New(env);
  result["credential"] =
      Napi::String::New(env, SecHandleUtil::serialize(credHandle));
  result["tsExpiry"] = JS::convert(env, &tsExpiry);
  return result;
}

}  // namespace myAddon
