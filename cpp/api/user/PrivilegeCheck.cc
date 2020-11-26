#include "../../misc.h"

namespace myAddon {

Napi::Boolean e_PrivilegeCheck(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT(
      "PrivilegeCheck(input: {accessToken: AccessToken; "
      "requireAll: boolean; "
      "requiredPrivileges: TokenPrivileges;}): boolean;",
      1);

  Napi::Object input = info[0].As<Napi::Object>();

  CHECK_PROP(input, "accessToken", IsString);
  CHECK_PROP(input, "requireAll", IsBoolean);
  CHECK_PROP(input, "requiredPrivileges", IsObject);

  HANDLE accessTokenHandle =
      s2p(input.Get("accessToken").As<Napi::String>().Utf8Value());

  BOOL requireAll = input.Get("requireAll").As<Napi::Boolean>();

  PPRIVILEGE_SET pRequiredPrivileges = JS::toSetPrivileges(
      input.Get("requiredPrivileges").As<Napi::Object>(), requireAll);

  BOOL result;

  BOOL status = PrivilegeCheck(  //
      accessTokenHandle,         // access token
      pRequiredPrivileges,       // required privileges
      &result                    // output (true or false)
  );
  CHECK_ERROR(status, "AdjustTokenPrivileges");

  return Napi::Boolean::New(env, result);
}  // namespace myAddon

}  // namespace myAddon
