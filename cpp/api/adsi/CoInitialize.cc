
#include "../../misc.h"

namespace myAddon {

void e_CoInitialize(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() > 0) {
    throw Napi::Error::New(env, "CoInitialize(): no arguments needed.");
  }

  // Initialize COM.
  HRESULT hr = CoInitialize(NULL);
  if (hr != S_OK) {
    throw Napi::Error::New(env, "error in CoInitialize");
  }
  return;
}

}  // namespace myAddon
