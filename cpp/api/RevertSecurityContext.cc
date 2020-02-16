#include "../misc.h"

namespace myAddon {

void e_RevertSecurityContext(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "RevertSecurityContext: Wrong number of arguments. "
        "RevertSecurityContext(serverContextHandle: string)");
  }

  Napi::String serverContextHandleString = info[0].As<Napi::String>();
  CtxtHandle serverContextHandle =
      SecHandleUtil::deserialize(serverContextHandleString.Utf8Value());

  SECURITY_STATUS secStatus = RevertSecurityContext(&serverContextHandle);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot RevertSecurityContext: secStatus = " +
                                    plf::error_msg(secStatus));
  }
}

}  // namespace myAddon
