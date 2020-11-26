#include "../../misc.h"

namespace myAddon {

void e_ExitWindowsEx(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT("ExitWindowsEx({flag: string, reason: string[]})", 1);

  Napi::Object input = info[0].As<Napi::Object>();

  CHECK_PROP(input, "flag", IsString);
  CHECK_PROP(input, "reason", IsArray);

  UINT flag = getFlag(env, EWX_FLAGS, input, "flags", EWX_LOGOFF);
  UINT reason = getFlags(env, SHTDN_FLAGS, input, "reason",
                         SHTDN_REASON_MAJOR_OTHER | SHTDN_REASON_MINOR_HUNG);

  BOOL status = ExitWindowsEx(flag, reason);
  if (status == FALSE) {
    throw Napi::Error::New(env,
                           "ExitWindowsEx has failed. " + plf::error_msg());
  }
}

}  // namespace myAddon
