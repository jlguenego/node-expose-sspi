#include "../misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

Napi::Value e_OpenThreadToken(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  HANDLE userToken;

  BOOL status =
      OpenThreadToken(GetCurrentThread(), TOKEN_QUERY_SOURCE | TOKEN_READ, TRUE, &userToken);
  if (status == FALSE) {
    std::string message = plf::string_format(
        "Cannot QuerySecurityContextToken: secStatus = 0x%08x", GetLastError());
    throw Napi::Error::New(env, message);
  }
  std::stringstream sa;
  sa << "0x" << std::setfill('0') << std::setw(4)
     << std::hex << userToken;

  return Napi::String::New(env, sa.str());
}

}  // namespace myAddon
