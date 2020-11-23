#include "../../misc.h"

namespace myAddon {

void e_ExitWindows(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  CHECK_INPUT("ExitWindows()", 0);

  // logoff the user but do not shutdown or restart
  ExitWindows(0, 0);
  return;
}

}  // namespace myAddon
