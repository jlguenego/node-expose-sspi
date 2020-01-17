#pragma once

#define NODE_ADDON_API_DISABLE_DEPRECATED
#include "napi.h"

#include <stdio.h>
#include <string>

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

#include <codecvt>
#include <locale>

#include "log.h"

namespace myAddon {
Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info);
}