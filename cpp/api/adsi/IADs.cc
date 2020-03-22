#include "IADs.h"
#include "../../log.h"

#include "../../pointer.h"
#include "../../polyfill.h"

#include <atlbase.h>
#include <comutil.h>

namespace myAddon {

Napi::FunctionReference E_IADs::constructor;

Napi::Object E_IADs::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func =
      DefineClass(env, "IADs",
                  {InstanceMethod("Get", &E_IADs::Get),
                   InstanceMethod("GetInfo", &E_IADs::GetInfo),
                   InstanceMethod("GetInfoEx", &E_IADs::GetInfoEx),
                   InstanceMethod("get_Name", &E_IADs::get_Name),
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
  std::wstring str = _bstr_t(bstrName);
  SysFreeString(bstrName);
  return Napi::String::New(info.Env(), (const char16_t*)str.c_str());
}

Napi::Value E_IADs::Get(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string input = info[0].As<Napi::String>().Utf8Value();

  VARIANT var;
  VariantInit(&var);

  HRESULT hr = this->iads->Get(CComBSTR(input.c_str()), &var);
  if (FAILED(hr)) {
    throw Napi::Error::New(env, "IADs.Get failed:" + plf::ad_error_msg(hr));
  }
  BSTR bs = V_BSTR(&var);
  std::wstring ws(bs, SysStringLen(bs));
  const char16_t* str = (const char16_t*)ws.c_str();
  VariantClear(&var);
  return Napi::String::New(info.Env(), str);
}

void E_IADs::GetInfo(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  HRESULT hr = this->iads->GetInfo();
  if (FAILED(hr)) {
    throw Napi::Error::New(env, "IADs.GetInfo failed:" + plf::ad_error_msg(hr));
  }
}

void E_IADs::GetInfoEx(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  VARIANT var;
  VariantInit(&var);

  uint32_t length = info.Length();

  LPWSTR* pszAttrs = (LPWSTR*)malloc(length * (sizeof LPWSTR));
  for (uint32_t i = 0; i < length; i++) {
    LPWSTR s = (LPWSTR)info[i].As<Napi::String>().Utf16Value().c_str();
    pszAttrs[i] = s;
  }
  HRESULT hr = ADsBuildVarArrayStr(pszAttrs, length, &var);
  if (FAILED(hr)) {
    throw Napi::Error::New(
        env, "ADsBuildVarArrayStr failed:" + plf::ad_error_msg(hr));
  }
  hr = this->iads->GetInfoEx(var, 0);
  VariantClear(&var);
  free(pszAttrs);
  if (FAILED(hr)) {
    throw Napi::Error::New(env, "IADs.GetInfo failed:" + plf::ad_error_msg(hr));
  }
  log("GetInfoEx done");
}

void E_IADs::Release(const Napi::CallbackInfo& info) { this->iads->Release(); }

}  // namespace myAddon