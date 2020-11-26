#include "../../misc.h"

namespace myAddon {

void e_AdjustTokenPrivileges(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT(
      "AdjustTokenPrivileges(input: {accessToken: AccessToken; "
      "disableAllPrivileges: boolean; "
      "newState?: TokenPrivileges;}): void;",
      1);

  Napi::Object input = info[0].As<Napi::Object>();

  CHECK_PROP(input, "accessToken", IsString);
  CHECK_PROP(input, "disableAllPrivileges", IsBoolean);
  CHECK_PROP_OPTIONAL(input, "newState", IsObject);

  HANDLE accessTokenHandle =
      s2p(input.Get("accessToken").As<Napi::String>().Utf8Value());

  BOOL disableAllPrivileges =
      input.Get("disableAllPrivileges").As<Napi::Boolean>();

  PTOKEN_PRIVILEGES pNewState = NULL;
  if (input.Has("newState")) {
    pNewState = JS::toTokenPrivileges(input.Get("newState").As<Napi::Object>());
  }

  BOOL status = AdjustTokenPrivileges(  //
      accessTokenHandle,                // access token
      disableAllPrivileges,             // true for disabling all privileges
      disableAllPrivileges ? NULL : pNewState,  // privileges to adjust
      0,     // we do not use previousState so we put 0
      NULL,  // we do not use previousState so we put NULL
      NULL   // we do not use previousState so we put NULL
  );
  if (pNewState) {
    free(pNewState);
  }
  CHECK_ERROR(status, "AdjustTokenPrivileges");

}  // namespace myAddon

}  // namespace myAddon
