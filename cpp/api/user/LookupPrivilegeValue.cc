#include "../../misc.h"

namespace myAddon {

Napi::Object e_LookupPrivilegeValue(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT(
      "LookupPrivilegeValue({privilegeName: string, systemName?: string})", 1);

  Napi::Object input = info[0].As<Napi::Object>();

  CHECK_PROP(input, "privilegeName", IsString);
  CHECK_PROP_OPTIONAL(input, "systemName", IsString);

  std::u16string sPrivilegeName = input.Get("privilegeName").As<Napi::String>();
  LPCWSTR privilegeName = (LPCWSTR)sPrivilegeName.c_str();

  LPCWSTR systemName = NULL;
  if (input.Has("systemName")) {
    std::u16string sSystemName = input.Get("privilegeName").As<Napi::String>();
    systemName = (LPCWSTR)sSystemName.c_str();
  }

  LUID luid;
  BOOL status = LookupPrivilegeValue(systemName, privilegeName, &luid);
  CHECK_ERROR(status, "LookupPrivilegeValue");

  return JS::fromLuid(env, &luid);
}

}  // namespace myAddon
