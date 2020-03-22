#include "IADsContainer.h"
#include "../../log.h"
#include "IDispatch.h"

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

  HRESULT hr = ADsBuildEnumerator(this->iadsContainer, &(this->pEnum));
  if (FAILED(hr)) {
    throw Napi::Error::New(
        env, "IADsContainer constructor failed:" + plf::ad_error_msg(hr));
  }
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
  Napi::Env env = info.Env();
  VARIANT var;
  ULONG lFetch;
  HRESULT hr = this->pEnum->Next(1, &var, &lFetch);
  if (FAILED(hr)) {
    throw Napi::Error::New(env, "Next failed:" + plf::ad_error_msg(hr));
  }
  if (lFetch == 0) {
    return env.Undefined();
  }

  IDispatch* pDisp = V_DISPATCH(&var);

  return E_IDispatch::NewInstance(env,
                                  Napi::String::New(info.Env(), p2s(pDisp)));
}

}  // namespace myAddon