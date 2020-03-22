
#include "../../misc.h"
#include "./IADs.h"

namespace myAddon {

Napi::Value e_ADsOpenObject(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() != 1) {
    throw Napi::Error::New(
        env,
        "ADsOpenObject({bindingUri: string, user: string, password: string, "
        "adsAuthentication: ADS_AUTHENTICATION_ENUM}): bad arguments.");
  }

  Napi::Object input = info[0].As<Napi::Object>();

  std::u16string bindingStr =
      input.Get("binding").As<Napi::String>().Utf16Value();
  LPCWSTR binding = (LPCWSTR)bindingStr.c_str();

  LPCWSTR user = NULL;
  if (input.Has("user")) {
    std::u16string userStr = input.Get("user").As<Napi::String>().Utf16Value();
    user = (LPCWSTR)bindingStr.c_str();
  }

  LPCWSTR password = NULL;
  if (input.Has("password")) {
    std::u16string passwordStr =
        input.Get("password").As<Napi::String>().Utf16Value();
    password = (LPCWSTR)bindingStr.c_str();
  }

  DWORD flag = getFlag(env, ADS_AUTHENTICATION_FLAGS, input,
                       "authenticationFlag", ADS_SECURE_AUTHENTICATION);

  IADs *pObject;
  HRESULT hr =
      ADsOpenObject(binding, user, password, flag, IID_IADs, (void **)&pObject);
  if (FAILED(hr)) {
    throw Napi::Error::New(env,
                           "error in ADsOpenObject: " + plf::ad_error_msg(hr));
  }

  return E_IADs::NewInstance(env, Napi::String::New(info.Env(), p2s(pObject)));
}

}  // namespace myAddon
