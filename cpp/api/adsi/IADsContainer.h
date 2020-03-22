#pragma once

#include <napi.h>
#include <Iads.h>

namespace myAddon {

class E_IADsContainer : public Napi::ObjectWrap<E_IADsContainer> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  static Napi::Object NewInstance(Napi::Env env, Napi::Value arg);
  E_IADsContainer(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  void Release(const Napi::CallbackInfo& info);
  Napi::Value Next(const Napi::CallbackInfo& info);

 public:
  IADsContainer* iadsContainer;
};

}  // namespace myAddon