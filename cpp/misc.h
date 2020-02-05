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

#include "SecHandleUtil.h"

#include "JS.h"
#include "log.h"

#define RESERVED NULL

#define BUFFER_SIZE 1024

namespace myAddon {

double TimeStampToUnix(TimeStamp ts);
Napi::Value e_EnumerateSecurityPackages(const Napi::CallbackInfo &info);
Napi::Value e_QuerySecurityPackageInfo(const Napi::CallbackInfo &info);
Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info);
Napi::Value e_QueryCredentialsAttributes(const Napi::CallbackInfo &info);
Napi::Value e_QueryContextAttributes(const Napi::CallbackInfo &info);
void e_FreeCredentialsHandle(const Napi::CallbackInfo &info);
Napi::Value e_InitializeSecurityContext(const Napi::CallbackInfo &info);
Napi::Value e_AcceptSecurityContext(const Napi::CallbackInfo &info);
void e_DeleteSecurityContext(const Napi::CallbackInfo &info);
void e_ImpersonateSecurityContext(const Napi::CallbackInfo &info);
void e_RevertSecurityContext(const Napi::CallbackInfo &info);
Napi::Value e_GetUserName(const Napi::CallbackInfo &info);

}  // namespace myAddon