#include "../../misc.h"

namespace myAddon {

Napi::Value e_GetUserName(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  LPWSTR lpBuffer = NULL;
  DWORD cbBuffer = 1;

  BOOL status = GetUserName(NULL, &cbBuffer);
  if (status == FALSE && GetLastError() != ERROR_INSUFFICIENT_BUFFER) {
    throw Napi::Error::New(env, "GetUserName: error first call. " + plf::error_msg());
  }
  lpBuffer = (LPWSTR)malloc(cbBuffer * sizeof(WCHAR));
  status = GetUserName(lpBuffer, &cbBuffer);
  if (status == FALSE) {
    throw Napi::Error::New(env, "GetUserName: error second call. " + plf::error_msg());
  }

  Napi::String result = Napi::String::New(env, (char16_t *)lpBuffer);
  return result;
}

}  // namespace myAddon
