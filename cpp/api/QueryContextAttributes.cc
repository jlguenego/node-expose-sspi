#include "../misc.h"

namespace myAddon {

Napi::Value e_QueryContextAttributes(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    throw Napi::Error::New(
        env,
        "QueryContextAttributes: Wrong number of arguments. "
        "QueryContextAttributes(context: string, attributeName: "
        "string)");
  }

  CtxtHandle context =
      SecHandleUtil::deserialize(info[0].As<Napi::String>().Utf8Value());
  std::string attributesStr = info[1].As<Napi::String>().Utf8Value();

  SECURITY_STATUS secStatus;

  if (attributesStr == "SECPKG_ATTR_NAMES") {
    SecPkgContext_Names contextNames;
    secStatus =
        QueryContextAttributes(&context, SECPKG_ATTR_NAMES, &contextNames);

    if (secStatus != SEC_E_OK) {
      throw Napi::Error::New(env, "Cannot QueryContextAttributes: secStatus = " + plf::error_msg(secStatus));
    }

    Napi::Object result = Napi::Object::New(env);
    result["sUserName"] =
        Napi::String::New(env, (char16_t*)contextNames.sUserName);
    return result;

  }

  throw Napi::Error::New(env, "QueryContextAttributes: attribute not recognized: " + attributesStr);
}

}  // namespace myAddon
