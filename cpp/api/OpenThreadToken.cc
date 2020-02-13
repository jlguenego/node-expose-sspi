#include "../misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Value e_OpenThreadToken(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  DWORD flags = TOKEN_QUERY | TOKEN_QUERY_SOURCE;

  if (info.Length() == 1) {
    flags = 0;
    Napi::Array flagArray = info[0].As<Napi::Array>();
    for (uint32_t i = 0; i < flagArray.Length(); i++) {
      std::string flagStr = flagArray.Get(i).As<Napi::String>();
      DWORD flag = getFlagValue(env, ACCESS_TOKEN_FLAGS, flagStr);
      flags |= flag;
    }
  }

  HANDLE userToken;

  BOOL status =
      OpenThreadToken(GetCurrentThread(), flags, TRUE, &userToken);
  if (status == FALSE) {
    throw Napi::Error::New(env, "OpenThreadToken: error. " + plf::error_msg());
  }
  std::stringstream sa;
  sa << "0x" << std::setfill('0') << std::setw(4)
     << std::hex << userToken;

  return Napi::String::New(env, sa.str());
}

}  // namespace myAddon
