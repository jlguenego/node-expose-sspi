#include "../misc.h"

namespace myAddon {

Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "AcquireCredentialsHandle: Wrong number of arguments. "
        "AcquireCredentialsHandle({ packageName: string, authIden?: {login: "
        "string, password: string} })");
  }

  bool isBasicAuth = false;

  Napi::Object input = info[0].As<Napi::Object>();

  std::u16string packageName = input.Get("packageName").As<Napi::String>();
  CredHandle credHandle = {0, 0};
  TimeStamp tsExpiry;

  SEC_WINNT_AUTH_IDENTITY authIden;

  SECURITY_STATUS secStatus = AcquireCredentialsHandle(
      NULL, (LPWSTR)packageName.c_str(), SECPKG_CRED_BOTH, NULL,
      isBasicAuth ? &authIden : NULL, RESERVED, RESERVED, &credHandle,
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
