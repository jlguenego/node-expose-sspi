#include "IADsContainer.h"
#include "../../log.h"

#include "../../pointer.h"
#include "../../polyfill.h"

#include <atlbase.h>
#include <comutil.h>

namespace myAddon {

Napi::FunctionReference E_IADsContainer::constructor;

Napi::Object E_IADsContainer::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func =
      DefineClass(env, "IADsContainer",
                  {InstanceMethod("Release", &E_IADsContainer::Release),
                   InstanceMethod("Next", &E_IADsContainer::Next)});

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("IADsContainer", func);
  return exports;
}

E_IADsContainer::E_IADsContainer(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<E_IADsContainer>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  Napi::String str = info[0].As<Napi::String>();
  IADsContainer* iadsContainer = (IADsContainer*)s2p(str.Utf8Value());
  this->iadsContainer = iadsContainer;
}

Napi::Object E_IADsContainer::NewInstance(Napi::Env env, Napi::Value arg) {
  Napi::EscapableHandleScope scope(env);
  Napi::Object obj = constructor.New({arg});
  return scope.Escape(napi_value(obj)).ToObject();
}

void E_IADsContainer::Release(const Napi::CallbackInfo& info) {
  this->iadsContainer->Release();
}

Napi::Value E_IADsContainer::Next(const Napi::CallbackInfo& info) {
  return Napi::String::New(info.Env(), "To be implemented");
}

}  // namespace myAddon