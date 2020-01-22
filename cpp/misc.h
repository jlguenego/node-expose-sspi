#pragma once

#define NODE_ADDON_API_DISABLE_DEPRECATED
#include "napi.h"

#include <stdio.h>
#include <iostream>
#include <map>
#include <string>

#include <codecvt>
#include <locale>

#include "polyfill.h"

#include "Credentials.h"
#include "JS.h"
#include "log.h"

// TODO: to be removed because it would be better to let the user enter this or
// allocate.
#define cbMaxMessage 48000

#define RESERVED NULL

#define BUFFER_SIZE 1024

namespace myAddon {

extern std::map<std::string, Credentials> credMap;

double TimeStampToUnix(TimeStamp ts);
Napi::Value e_EnumerateSecurityPackages(const Napi::CallbackInfo &info);
Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info);
Napi::Value e_InitializeSecurityContext(const Napi::CallbackInfo &info);
Napi::Value count(const Napi::CallbackInfo &info);

}  // namespace myAddon