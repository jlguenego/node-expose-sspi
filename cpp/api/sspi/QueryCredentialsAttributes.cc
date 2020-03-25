#include "../../misc.h"

namespace myAddon {

Napi::Value e_QueryCredentialsAttributes(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    throw Napi::Error::New(
        env,
        "QueryCredentialsAttributes: Wrong number of arguments. "
        "QueryCredentialsAttributes(credential: string, attributeName: "
        "string)");
  }

  CredHandle cred =
      SecHandleUtil::deserialize(info[0].As<Napi::String>().Utf8Value());
  std::string attributesStr = info[1].As<Napi::String>().Utf8Value();

  SECURITY_STATUS secStatus;

  if (attributesStr == "SECPKG_CRED_ATTR_NAMES") {
    SecPkgCredentials_Names credNames;
    secStatus =
        QueryCredentialsAttributes(&cred, SECPKG_CRED_ATTR_NAMES, &credNames);

    if (secStatus != SEC_E_OK) {
      throw Napi::Error::New(env, "Cannot QueryCredentialsAttributes: secStatus = " + plf::error_msg(secStatus));
    }

    Napi::Object result = Napi::Object::New(env);
    result["sUserName"] =
        Napi::String::New(env, (char16_t*)credNames.sUserName);
    return result;

  }

  throw Napi::Error::New(env, "QueryCredentialsAttributes: attribute not recognized: " + attributesStr);
}

}  // namespace myAddon
