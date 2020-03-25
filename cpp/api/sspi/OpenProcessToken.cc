#include "../../misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Value e_OpenProcessToken(const Napi::CallbackInfo& info) {
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

  HANDLE token;

  BOOL status = OpenProcessToken(GetCurrentProcess(), flags, &token);

  if (status == FALSE) {
    throw Napi::Error::New(env, "Cannot OpenProcessToken: status = " + plf::error_msg());
  }
  std::stringstream sa;
  sa << "0x" << std::setfill('0') << std::setw(4) << std::hex << token;

  return Napi::String::New(env, sa.str());
}

}  // namespace myAddon
