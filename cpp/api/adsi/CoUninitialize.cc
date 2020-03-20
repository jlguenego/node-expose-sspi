
#include "../../misc.h"

namespace myAddon {

void e_CoUninitialize(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() > 0) {
    throw Napi::Error::New(env, "CoUninitialize(): no arguments needed.");
  }

  CoUninitialize();
  
  return;
}

}  // namespace myAddon
