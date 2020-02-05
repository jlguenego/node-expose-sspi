#include "misc.h"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace myAddon {

void e_CloseHandle(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env,
                           "CloseHandle: Wrong number of arguments. "
                           "CloseHandle(accessToken: string)");
  }

  HANDLE handle;
  std::string handleStr = info[0].As<Napi::String>().Utf8Value().substr(2);
  std::istringstream c1(handleStr);
  c1 >> std::hex >> handle;

  BOOL status = CloseHandle(handle);
  if (status == FALSE) {
    if (GetLastError() == ERROR_INVALID_HANDLE) {
      throw Napi::Error::New(env, "Cannot CloseHandle: error invalid handle");
    }
    std::string message = plf::string_format(
        "Cannot CloseHandle: error = 0x%08x", GetLastError());
    throw Napi::Error::New(env, message);
  }
}

}  // namespace myAddon
