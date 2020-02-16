#include "../misc.h"

namespace myAddon {

void e_FreeCredentialsHandle(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env,
                           "FreeCredentialsHandle: Wrong number of arguments.");
  }

  CredHandle cred =
      SecHandleUtil::deserialize(info[0].As<Napi::String>().Utf8Value());

  SECURITY_STATUS secStatus = FreeCredentialsHandle(&cred);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(
        env, "FreeCredentialsHandle error = " + plf::error_msg(secStatus));
  }
}

}  // namespace myAddon
