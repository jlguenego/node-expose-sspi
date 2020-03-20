#pragma once

#include <napi.h>

namespace myAddon {

class E_IADs : public Napi::ObjectWrap<E_IADs> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  E_IADs(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  Napi::Value GetValue(const Napi::CallbackInfo& info);
  Napi::Value PlusOne(const Napi::CallbackInfo& info);
  Napi::Value Multiply(const Napi::CallbackInfo& info);

  double value_;
};

}  // namespace myAddon