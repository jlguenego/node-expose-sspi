#include "../misc.h"

namespace myAddon {

Napi::Value e_GetUserName(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  LPWSTR lpBuffer = NULL;
  DWORD cbBuffer = 1;

  BOOL status = GetUserName(NULL, &cbBuffer);
  if (status == FALSE && GetLastError() != ERROR_INSUFFICIENT_BUFFER) {
    std::string msg = plf::string_format(
        "GetUserName: error first call. (error code: 0x%08x)", GetLastError());
    throw Napi::Error::New(env, msg);
  }
  lpBuffer = (LPWSTR)malloc(cbBuffer * sizeof(WCHAR));
  status = GetUserName(lpBuffer, &cbBuffer);
  if (status == FALSE) {
    std::string msg = plf::string_format(
        "GetUserName: error second call. (error code: 0x%08x)", GetLastError());
    throw Napi::Error::New(env, msg);
  }

  Napi::String result = Napi::String::New(env, (char16_t *)lpBuffer);
  return result;
}

}  // namespace myAddon
