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
#include "pointer.h"

#include "SecHandleUtil.h"

#include "JS.h"
#include "log.h"
#include "flags.h"

#include "macros.h"

#include "adsi.h"

#define RESERVED NULL

#define BUFFER_SIZE 1024

namespace myAddon {

double TimeStampToUnix(TimeStamp ts);
Napi::Value e_EnumerateSecurityPackages(const Napi::CallbackInfo &info);
Napi::Value e_QuerySecurityPackageInfo(const Napi::CallbackInfo &info);
Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo &info);
Napi::Value e_QueryCredentialsAttributes(const Napi::CallbackInfo &info);
Napi::Value e_QueryContextAttributes(const Napi::CallbackInfo &info);
Napi::Value e_QuerySecurityContextToken(const Napi::CallbackInfo &info);
Napi::Value e_OpenThreadToken(const Napi::CallbackInfo &info);
Napi::Value e_OpenProcessToken(const Napi::CallbackInfo &info);
Napi::Value e_GetTokenInformation(const Napi::CallbackInfo &info);
void e_CloseHandle(const Napi::CallbackInfo &info);
void e_FreeCredentialsHandle(const Napi::CallbackInfo &info);
Napi::Value e_InitializeSecurityContext(const Napi::CallbackInfo &info);
Napi::Value e_AcceptSecurityContext(const Napi::CallbackInfo &info);
void e_DeleteSecurityContext(const Napi::CallbackInfo &info);
void e_ImpersonateSecurityContext(const Napi::CallbackInfo &info);
void e_RevertSecurityContext(const Napi::CallbackInfo &info);
Napi::Value e_GetUserName(const Napi::CallbackInfo &info);
Napi::Value e_GetUserNameEx(const Napi::CallbackInfo &info);
Napi::Value e_LookupAccountName(const Napi::CallbackInfo &info);
Napi::Value e_AllocateAndInitializeSid(const Napi::CallbackInfo &info);
void e_FreeSid(const Napi::CallbackInfo &info);
Napi::Boolean e_CheckTokenMembership(const Napi::CallbackInfo &info);

// ADSI
void e_CoInitialize(const Napi::CallbackInfo &info);
void e_CoInitializeEx(const Napi::CallbackInfo &info);
void e_CoUninitialize(const Napi::CallbackInfo &info);
Napi::Promise e_ADsGestObject(const Napi::CallbackInfo &info);
Napi::Value e_ADsOpenObject(const Napi::CallbackInfo &info);
Napi::Value e_ADsOpenObjectSync(const Napi::CallbackInfo &info);

// SYSINFO
Napi::Value e_GetComputerNameEx(const Napi::CallbackInfo &info);

// NETAPI
void e_NetUserAdd(const Napi::CallbackInfo &info);
void e_NetUserDel(const Napi::CallbackInfo &info);

// USER
Napi::Object e_LookupPrivilegeValue(const Napi::CallbackInfo &info);
void e_ExitWindows(const Napi::CallbackInfo &info);
void e_ExitWindowsEx(const Napi::CallbackInfo &info);

}  // namespace myAddon