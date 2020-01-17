#define NODE_ADDON_API_DISABLE_DEPRECATED
#include "napi.h"

#include <stdio.h>

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

namespace myAddon {

Napi::Value hello(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Coucou JL!!!");
}

Napi::Value e_InitSecurityInterface(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  printf("about to InitSecurityInterface\n");

  PSecurityFunctionTable ptable = InitSecurityInterface();
  printf("debug: dwVersion=%d\n", ptable->dwVersion);
  Napi::Object obj = Napi::Object::New(env);
  obj["dwVersion"] = Napi::Number::New(env, (double) ptable->dwVersion);

  return obj;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, hello));

  exports.Set(Napi::String::New(env, "InitSecurityInterface"),
              Napi::Function::New(env, e_InitSecurityInterface));

  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace myAddon
