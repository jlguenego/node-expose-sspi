#include "IADs.h"

namespace myAddon {

Napi::FunctionReference E_IADs::constructor;

Napi::Object E_IADs::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func =
      DefineClass(env, "IADs",
                  {InstanceMethod("plusOne", &E_IADs::PlusOne),
                   InstanceMethod("getValue", &E_IADs::GetValue),
                   InstanceMethod("multiply", &E_IADs::Multiply)});

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("IADs", func);
  return exports;
}

E_IADs::E_IADs(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<E_IADs>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  int length = info.Length();

  if (length <= 0 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Number value = info[0].As<Napi::Number>();
  this->value_ = value.DoubleValue();
}

Napi::Object E_IADs::NewInstance(Napi::Env env, Napi::Value arg) {
  Napi::EscapableHandleScope scope(env);
  Napi::Object obj = constructor.New({arg});
  return scope.Escape(napi_value(obj)).ToObject();
}

Napi::Value E_IADs::GetValue(const Napi::CallbackInfo& info) {
  double num = this->value_;

  return Napi::Number::New(info.Env(), num);
}

Napi::Value E_IADs::PlusOne(const Napi::CallbackInfo& info) {
  this->value_ = this->value_ + 1;

  return E_IADs::GetValue(info);
}

Napi::Value E_IADs::Multiply(const Napi::CallbackInfo& info) {
  Napi::Number multiple;
  if (info.Length() <= 0 || !info[0].IsNumber()) {
    multiple = Napi::Number::New(info.Env(), 1);
  } else {
    multiple = info[0].As<Napi::Number>();
  }

  Napi::Object obj = constructor.New(
      {Napi::Number::New(info.Env(), this->value_ * multiple.DoubleValue())});

  return obj;
}

}  // namespace myAddon