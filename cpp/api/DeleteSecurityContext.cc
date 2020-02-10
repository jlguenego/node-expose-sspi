#include "../misc.h"

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
    std::string message = plf::string_format(
        "Cannot DeleteSecurityContext: secStatus = 0x%08x", secStatus);
    throw Napi::Error::New(env, message);
  }
}

}  // namespace myAddon
