#include "../misc.h"

#include <Security.h>

namespace myAddon {

Napi::Value e_GetUserNameEx(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  EXTENDED_NAME_FORMAT extendedNameFormat = (EXTENDED_NAME_FORMAT)getFlagValue(
      env, GETFLAG_EXTENDED_NAME_FORMAT, info[0].As<Napi::String>().Utf8Value());

  LPWSTR lpNameBuffer = NULL;
  ULONG nSize = 1;

  BOOLEAN status = GetUserNameEx(extendedNameFormat, NULL, &nSize);

  if (status == FALSE && GetLastError() != ERROR_MORE_DATA) {
    throw Napi::Error::New(env, "GetUserNameEx: error first call. " + plf::error_msg());
  }
  lpNameBuffer = (LPWSTR)malloc(nSize * sizeof(TCHAR));
  status = GetUserNameEx(extendedNameFormat, lpNameBuffer, &nSize);
  if (status == FALSE) {
    throw Napi::Error::New(env, "GetUserNameEx: error second call. " + plf::error_msg());
  }

  Napi::String result = Napi::String::New(env, (char16_t *)lpNameBuffer);
  return result;
}

}  // namespace myAddon
