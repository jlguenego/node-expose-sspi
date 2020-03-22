#include "IDispatch.h"
#include "IDirectorySearch.h"
#include "../../log.h"

#include "../../pointer.h"
#include "../../polyfill.h"

#include <atlbase.h>
#include <comutil.h>

namespace myAddon {

Napi::FunctionReference E_IDispatch::constructor;

Napi::Object E_IDispatch::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(
      env, "IDispatch",
      {InstanceMethod("Release", &E_IDispatch::Release),
       InstanceMethod("QueryInterface", &E_IDispatch::QueryInterface)});

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("IDispatch", func);
  return exports;
}

E_IDispatch::E_IDispatch(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<E_IDispatch>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  Napi::String str = info[0].As<Napi::String>();
  IDispatch* iDispatch = (IDispatch*)s2p(str.Utf8Value());
  this->iDispatch = iDispatch;
}

Napi::Object E_IDispatch::NewInstance(Napi::Env env, Napi::Value arg) {
  Napi::EscapableHandleScope scope(env);
  Napi::Object obj = constructor.New({arg});
  return scope.Escape(napi_value(obj)).ToObject();
}

void E_IDispatch::Release(const Napi::CallbackInfo& info) {
  this->iDispatch->Release();
}

Napi::Value E_IDispatch::QueryInterface(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  void *pObject;
  HRESULT hr = this->iDispatch->QueryInterface(IID_IDirectorySearch, &pObject);
  if (FAILED(hr)) {
    throw Napi::Error::New(
        env, "E_IDispatch.QueryInterface failed:" + plf::ad_error_msg(hr));
  }
  return E_IDirectorySearch::NewInstance(env, Napi::String::New(info.Env(), p2s(pObject)));
}

}  // namespace myAddon