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

// convert WCHAR_T* to std::string
extern std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t> converter;
#define FROM_WSTR converter.to_bytes

#include "log.h"

namespace myAddon {
Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info);
}