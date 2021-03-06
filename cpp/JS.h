#pragma once

#define NODE_ADDON_API_DISABLE_DEPRECATED
#include "napi.h"

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>
#include <string>

// TODO: to be removed because it would be better to let the user enter this or
// allocate.
#define cbMaxMessage 48256

namespace myAddon {

class JS {
 public:
  static Napi::Object fromLuid(Napi::Env env, LUID* pLUID);
  static LUID toLuid(Napi::Object value);

  static Napi::Object fromTokenPrivileges(Napi::Env env,
                                          PTOKEN_PRIVILEGES pTokenPrivileges);
  static PTOKEN_PRIVILEGES toTokenPrivileges(Napi::Object value);

  static PPRIVILEGE_SET JS::toSetPrivileges(Napi::Object value, DWORD control);

  static Napi::Value convert(Napi::Env env, SecBufferDesc* pSecBufferDesc);
  static Napi::Value convert(Napi::Env env, TimeStamp* pTimeStamp);
  static Napi::Array convert(Napi::Env env, unsigned long cPackages,
                             PSecPkgInfo pPackageInfo);
  static Napi::Object JS::convert(Napi::Env env, PSecPkgInfo pPackageInfo);

  static PSecBufferDesc initSecBufferDesc();
  static PSecBufferDesc initSecBufferDesc(Napi::Object& clientSecurityContext);
};

}  // namespace myAddon
