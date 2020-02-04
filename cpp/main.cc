#include "misc.h"

namespace myAddon {

Napi::Value hello(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Coucou JL!!!");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, hello));

  exports.Set(Napi::String::New(env, "EnumerateSecurityPackages"),
              Napi::Function::New(env, e_EnumerateSecurityPackages));

  exports.Set(Napi::String::New(env, "QuerySecurityPackageInfo"),
              Napi::Function::New(env, e_QuerySecurityPackageInfo));

  exports.Set(Napi::String::New(env, "AcquireCredentialsHandle"),
              Napi::Function::New(env, e_AcquireCredentialsHandle));

  exports.Set(Napi::String::New(env, "InitializeSecurityContext"),
              Napi::Function::New(env, e_InitializeSecurityContext));

  exports.Set(Napi::String::New(env, "AcceptSecurityContext"),
              Napi::Function::New(env, e_AcceptSecurityContext));

  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace myAddon
