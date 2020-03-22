#pragma once

#include <napi.h>
#include <Iads.h>

namespace myAddon {

class E_IADs : public Napi::ObjectWrap<E_IADs> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  static Napi::Object NewInstance(Napi::Env env, Napi::Value arg);
  E_IADs(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  Napi::Value get_Name(const Napi::CallbackInfo& info);
  Napi::Value Get(const Napi::CallbackInfo& info);
  void GetInfo(const Napi::CallbackInfo& info);
  void GetInfoEx(const Napi::CallbackInfo& info);
  void Release(const Napi::CallbackInfo& info);

  IADs* iads;
};

}  // namespace myAddon