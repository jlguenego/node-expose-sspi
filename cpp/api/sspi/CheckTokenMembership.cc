#include "../../misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Boolean e_CheckTokenMembership(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // limitation: token handle is always null.

  CHECK_INPUT(
      "CheckTokenMembership(\n"
      "sid: SidPointer,\n"
      ")",
      1);

  PSID SidToCheck = s2p(info[0].As<Napi::String>().Utf8Value());
  BOOL b;

  BOOL result = CheckTokenMembership(NULL, SidToCheck, &b);
  if (result == FALSE) {
    throw Napi::Error::New(env, "Cannot CheckTokenMembership");
  }

  return Napi::Boolean::New(env, b == TRUE);
}

}  // namespace myAddon
