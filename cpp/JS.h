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
};

}  // namespace myAddon
