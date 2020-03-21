#include "IADs.h"
#include "../../log.h"

#include "../../pointer.h"
#include "../../polyfill.h"

#include <comutil.h>

namespace myAddon {

Napi::FunctionReference E_IADs::constructor;

Napi::Object E_IADs::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func =
      DefineClass(env, "IADs",
                  {InstanceMethod("get_Name", &E_IADs::get_Name),
                   InstanceMethod("Release", &E_IADs::Release)});

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("IADs", func);
  return exports;
}

E_IADs::E_IADs(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<E_IADs>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  Napi::String str = info[0].As<Napi::String>();
  IADs* iads = (IADs*)s2p(str.Utf8Value());
  this->iads = iads;
}

Napi::Object E_IADs::NewInstance(Napi::Env env, Napi::Value arg) {
  Napi::EscapableHandleScope scope(env);
  Napi::Object obj = constructor.New({arg});
  return scope.Escape(napi_value(obj)).ToObject();
}

Napi::Value E_IADs::get_Name(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  BSTR bstrName;
  HRESULT hr = this->iads->get_Name(&bstrName);
  if (FAILED(hr)) {
    throw Napi::Error::New(env, "get_Name failed:" + plf::ad_error_msg(hr));
  }
  std::string str = _bstr_t(bstrName);
  SysFreeString(bstrName);
  return Napi::String::New(info.Env(), str);
}

void E_IADs::Release(const Napi::CallbackInfo& info) {
  this->iads->Release();
}

}  // namespace myAddon