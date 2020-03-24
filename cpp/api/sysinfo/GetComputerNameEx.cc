#include "../../misc.h"

namespace myAddon {

Napi::Value e_GetComputerNameEx(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT("GetComputerNameEx(type: ComputerNameFormatFlag)", 1);

  COMPUTER_NAME_FORMAT flag = (COMPUTER_NAME_FORMAT) getFlagValue(
      env, COMPUTER_NAME_FORMAT_FLAGS, info[0].As<Napi::String>().Utf8Value());

  WCHAR buffer[256] = L"";
  DWORD dwSize = sizeof(buffer);
  BOOL status = GetComputerNameEx(flag, buffer, &dwSize);
  if (status == FALSE) {
    throw Napi::Error::New(env, "GetComputerNameEx has failed. " + plf::error_msg());
  }

  return Napi::String::New(env, (const char16_t*)buffer);
}

}  // namespace myAddon
