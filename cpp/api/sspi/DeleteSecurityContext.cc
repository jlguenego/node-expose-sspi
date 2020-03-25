#include "../../misc.h"

namespace myAddon {

void e_DeleteSecurityContext(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env,
                           "DeleteSecurityContext: Wrong number of arguments. "
                           "AcceptSecurityContext(context)");
  }

  CtxtHandle serverContextHandle =
      SecHandleUtil::deserialize(info[0].As<Napi::String>().Utf8Value());

  SECURITY_STATUS secStatus = DeleteSecurityContext(&serverContextHandle);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot DeleteSecurityContext: secStatus: " + plf::error_msg(secStatus));
  }
}

}  // namespace myAddon
