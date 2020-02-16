#include "../misc.h"

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
    throw Napi::Error::New(env, "CloseHandle: error: " + plf::error_msg());
  }
}

}  // namespace myAddon
