
#include "../../misc.h"
#include "./IADs.h"

namespace myAddon {

Napi::Promise e_ADsGestObject(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  auto deferred = Napi::Promise::Deferred::New(env);
  if (info.Length() != 1) {
    deferred.Reject(
      Napi::Error::New(env, "ADsGestObject(bindingUri: string)").Value()
    );
    return deferred.Promise();
  }

  std::u16string bindingStr = info[0].As<Napi::String>().Utf16Value();
  LPCWSTR binding = (LPCWSTR)bindingStr.c_str();

  IADs *pObject;
  HRESULT hr = ADsGetObject(binding, IID_IADs, (void **)&pObject);
  if (FAILED(hr)) {
    deferred.Reject(
      Napi::Error::New(env, "ADsGetObject has failed: " + plf::ad_error_msg(hr)).Value()
    );
    return deferred.Promise();
  }

  auto result = E_IADs::NewInstance(env, Napi::String::New(info.Env(), p2s(pObject)));
  deferred.Resolve(result);
  return deferred.Promise();
}

}  // namespace myAddon
