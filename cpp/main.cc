#include "api/adsi/IADs.h"
#include "api/adsi/IADsContainer.h"
#include "api/adsi/IDirectorySearch.h"
#include "api/adsi/IDispatch.h"
#include "misc.h"

#define F(fn) Function::New(env, fn)
#define EXPORT(str) exports.Set(#str, F(e_##str))

using namespace Napi;

namespace myAddon {

Value e_hello(const CallbackInfo &info) {
  Env env = info.Env();
  return String::New(env, "Coucou JL!!!");
}

Object InitSSPI(Env env, Object exports) {
  EXPORT(hello);
  EXPORT(EnumerateSecurityPackages);
  EXPORT(QuerySecurityPackageInfo);
  EXPORT(AcquireCredentialsHandle);
  EXPORT(QueryCredentialsAttributes);
  EXPORT(QueryContextAttributes);
  EXPORT(QuerySecurityContextToken);
  EXPORT(OpenThreadToken);
  EXPORT(OpenProcessToken);
  EXPORT(GetTokenInformation);
  EXPORT(CloseHandle);
  EXPORT(FreeCredentialsHandle);
  EXPORT(InitializeSecurityContext);
  EXPORT(AcceptSecurityContext);
  EXPORT(DeleteSecurityContext);
  EXPORT(ImpersonateSecurityContext);
  EXPORT(RevertSecurityContext);
  EXPORT(GetUserName);
  EXPORT(GetUserNameEx);
  EXPORT(LookupAccountName);
  EXPORT(AllocateAndInitializeSid);
  EXPORT(FreeSid);
  EXPORT(CheckTokenMembership);
  return exports;
}

Object InitADSI(Env env, Object exports) {
  EXPORT(CoInitialize);
  EXPORT(CoInitializeEx);
  EXPORT(CoUninitialize);
  EXPORT(ADsGestObject);
  EXPORT(ADsOpenObject);
  EXPORT(ADsOpenObjectSync);
  E_IADs::Init(env, exports);
  E_IADsContainer::Init(env, exports);
  E_IDispatch::Init(env, exports);
  E_IDirectorySearch::Init(env, exports);

  // Constant
  exports.Set("S_ADS_NOMORE_ROWS", Number::New(env, 0x00005012));
  exports.Set("S_ADS_NOMORE_COLUMNS", Number::New(env, 0x00005013));
  return exports;
}

Object InitSYSINFO(Env env, Object exports) {
  EXPORT(GetComputerNameEx);
  return exports;
}

Object InitNETAPI(Env env, Object exports) {
  EXPORT(NetUserAdd);
  EXPORT(NetUserDel);
  return exports;
}

Object InitUSER(Env env, Object exports) {
  EXPORT(AdjustTokenPrivileges);
  EXPORT(LookupPrivilegeValue);
  EXPORT(ExitWindows);
  EXPORT(ExitWindowsEx);
  return exports;
}

Object Init(Env env, Object exports) {
  initFlags();
  exports.Set("sspi", InitSSPI(env, Object::New(env)));
  exports.Set("adsi", InitADSI(env, Object::New(env)));
  exports.Set("sysinfo", InitSYSINFO(env, Object::New(env)));
  exports.Set("netapi", InitNETAPI(env, Object::New(env)));
  exports.Set("user", InitUSER(env, Object::New(env)));
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace myAddon
