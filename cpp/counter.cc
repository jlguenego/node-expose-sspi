#include "misc.h"

namespace myAddon {

static int counter = 0;

Napi::Value count(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  counter++;
  return Napi::Number::New(env, counter);
}

}  // namespace myAddon