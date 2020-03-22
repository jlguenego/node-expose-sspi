#pragma once

#include <napi.h>
#include <Iads.h>

namespace myAddon {

class E_IDispatch : public Napi::ObjectWrap<E_IDispatch> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  static Napi::Object NewInstance(Napi::Env env, Napi::Value arg);
  E_IDispatch(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  void Release(const Napi::CallbackInfo& info);
  Napi::Value QueryInterface(const Napi::CallbackInfo& info);

  IDispatch* iDispatch;
};

}  // namespace myAddon