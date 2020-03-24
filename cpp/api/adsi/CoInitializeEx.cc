
#include "../../misc.h"

namespace myAddon {

void e_CoInitializeEx(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  CHECK_INPUT("CoInitialize(flags: CoInitFlags[])", 1);

  DWORD flags =
      getFlags(env, COINIT_FLAGS, info[0].As<Napi::Array>());

  // Initialize COM.
  HRESULT hr = CoInitializeEx(NULL, flags);
  if (hr != S_OK) {
    throw Napi::Error::New(env, "error in CoInitialize");
  }
  return;
}

}  // namespace myAddon
