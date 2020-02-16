#include "../misc.h"

namespace myAddon {

void e_ImpersonateSecurityContext(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "ImpersonateSecurityContext: Wrong number of arguments. "
        "ImpersonateSecurityContext(serverContextHandle: string)");
  }

  Napi::String serverContextHandleString = info[0].As<Napi::String>();
  CtxtHandle serverContextHandle =
      SecHandleUtil::deserialize(serverContextHandleString.Utf8Value());

  SECURITY_STATUS secStatus = ImpersonateSecurityContext(&serverContextHandle);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env,
                           "Cannot ImpersonateSecurityContext: secStatus = " +
                               plf::error_msg(secStatus));
  }

}

}  // namespace myAddon
