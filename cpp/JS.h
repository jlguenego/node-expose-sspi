#pragma once;

#define NODE_ADDON_API_DISABLE_DEPRECATED
#include "napi.h"

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>
#include <string>

namespace myAddon {

class JS {
 public:
  static Napi::Value convert(Napi::Env env, SecBufferDesc* pSecBufferDesc);
  static Napi::Value convert(Napi::Env env, TimeStamp* pTimeStamp);
  static Napi::Array JS::convert(Napi::Env env, unsigned long cPackages,
                                 PSecPkgInfo pPackageInfo);
};

}  // namespace myAddon
