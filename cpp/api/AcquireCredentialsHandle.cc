#include "../misc.h"

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
  if (input.Has("authData")) {
    isBasicAuth = true;
    Napi::Object userObj = input.Get("authData").As<Napi::Object>();

    std::u16string domainStr = userObj.Get("domain").As<Napi::String>();
    // wchar_t *domain = (wchar_t *)domainStr.c_str();
    wchar_t *domain = L"CHOUCHOU";
    log("domain %S", domain);
    authData.Domain = (unsigned short *)domain;
    authData.DomainLength = wcslen(domain);

    std::u16string userStr = userObj.Get("user").As<Napi::String>();
    // wchar_t *user = (wchar_t *)userStr.c_str();
    wchar_t *user = L"titi";
    log("user %S", user);
    authData.User = (unsigned short *)user;
    authData.UserLength = wcslen(user);

    std::u16string passwordStr = userObj.Get("password").As<Napi::String>();
    // wchar_t *password = (wchar_t *)passwordStr.c_str();
    wchar_t *password = L"toto";
    log("password %S", password);
    authData.Password = (unsigned short *)password;
    authData.PasswordLength = wcslen(password);

    authData.Flags = SEC_WINNT_AUTH_IDENTITY_UNICODE;
  }

  CredHandle credHandle = {0, 0};
  TimeStamp tsExpiry;

  SECURITY_STATUS secStatus = AcquireCredentialsHandle(
      NULL, (LPWSTR)packageName.c_str(), SECPKG_CRED_BOTH, NULL,
      isBasicAuth ? &authData : NULL, RESERVED, RESERVED, &credHandle,
      &tsExpiry);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot FreeContextBuffer: secStatus = " +
                                    std::to_string(secStatus));
  }

  Napi::Object result = Napi::Object::New(env);
  result["credential"] =
      Napi::String::New(env, SecHandleUtil::serialize(credHandle));
  result["tsExpiry"] = JS::convert(env, &tsExpiry);
  return result;
}

}  // namespace myAddon
