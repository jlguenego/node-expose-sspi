
#include "../../misc.h"
#include "./IADs.h"

namespace myAddon {

Napi::Promise e_ADsGestObject(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  auto deferred = Napi::Promise::Deferred::New(env);
  CHECK_INPUT_DEFERRED("ADsGestObject(bindingUri: string)", 1);

  std::u16string bindingStr = info[0].As<Napi::String>().Utf16Value();
  LPCWSTR binding = (LPCWSTR)bindingStr.c_str();

  IADs *pObject;
  HRESULT hr = ADsGetObject(binding, IID_IADs, (void **)&pObject);
  AD_CHECK_ERROR_DEFERRED(hr, "ADsGetObject");

  auto result =
      E_IADs::NewInstance(env, Napi::String::New(info.Env(), p2s(pObject)));
  deferred.Resolve(result);
  return deferred.Promise();
}

}  // namespace myAddon
