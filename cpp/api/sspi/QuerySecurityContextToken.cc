#include "../../misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Value e_QuerySecurityContextToken(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env,
                           "QuerySecurityContextToken: Wrong number of arguments. "
                           "QuerySecurityContextToken(context)");
  }

  CtxtHandle serverContextHandle =
      SecHandleUtil::deserialize(info[0].As<Napi::String>().Utf8Value());
  void* pAccessToken;

  SECURITY_STATUS secStatus =
      QuerySecurityContextToken(&serverContextHandle, &pAccessToken);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot QuerySecurityContextToken: secStatus = " + plf::error_msg(secStatus));
  }
  std::stringstream sa;
  sa << "0x" << std::setfill('0') << std::setw(4)
     << std::hex << pAccessToken;

  return Napi::String::New(env, sa.str());
}

}  // namespace myAddon
