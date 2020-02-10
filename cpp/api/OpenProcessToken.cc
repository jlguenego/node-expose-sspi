#include "../misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Value e_OpenProcessToken(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  HANDLE token;

  BOOL status = OpenProcessToken(GetCurrentProcess(), TOKEN_ALL_ACCESS, &token);

  if (status == FALSE) {
    std::string message = plf::string_format(
        "Cannot QuerySecurityContextToken: secStatus = 0x%08x", GetLastError());
    throw Napi::Error::New(env, message);
  }
  std::stringstream sa;
  sa << "0x" << std::setfill('0') << std::setw(4) << std::hex << token;

  return Napi::String::New(env, sa.str());
}

}  // namespace myAddon
