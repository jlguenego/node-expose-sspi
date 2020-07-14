#include <atlenc.h>

#include <iomanip>
#include <iostream>
#include <regex>
#include <sstream>

#include "../../misc.h"

namespace myAddon {

Napi::Value e_AllocateAndInitializeSid(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  CHECK_INPUT("AllocateAndInitializeSid()", 0);

  // TODO: implement the different input for AllocateAndInitializeSid
  BOOL b;
  SID_IDENTIFIER_AUTHORITY NtAuthority = SECURITY_NT_AUTHORITY;
  PSID AdministratorsGroup;
  b = AllocateAndInitializeSid(&NtAuthority, 2, SECURITY_BUILTIN_DOMAIN_RID,
                               DOMAIN_ALIAS_RID_ADMINS, 0, 0, 0, 0, 0, 0,
                               &AdministratorsGroup);
  if (b == FALSE) {
    throw Napi::Error::New(
        env, "AllocateAndInitializeSid: error. " + plf::error_msg());
  }

  return Napi::String::New(env, p2s(AdministratorsGroup));
}

}  // namespace myAddon
