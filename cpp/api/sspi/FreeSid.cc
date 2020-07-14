#include "../../misc.h"

#include <securitybaseapi.h>

namespace myAddon {

void e_FreeSid(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  CHECK_INPUT("FreeSid(sidPointer: SidPointer)", 1);

  PSID pSid = s2p(info[0].As<Napi::String>().Utf8Value());
  PVOID p = FreeSid(pSid);
  if (p != NULL) {
    throw Napi::Error::New(env, "FreeSid: error.");
  }
}

}  // namespace myAddon
