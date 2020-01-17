#include "misc.h"

// use converter (.to_bytes: wstr->str, .from_bytes: str->wstr)

namespace myAddon {

Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  Napi::Array result = Napi::Array::New(env);

  return result;
}

}  // namespace myAddon
