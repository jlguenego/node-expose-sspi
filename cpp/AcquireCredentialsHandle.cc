#include "misc.h"

namespace myAddon {

Napi::Value e_AcquireCredentialsHandle(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env, "AcquireCredentialsHandle: Wrong number of arguments.");
  }

  std::u16string ws = info[0].As<Napi::String>();
  const char16_t* pPackage = ws.c_str();

  CredHandle cred;
  TimeStamp tsExpiry;

  SECURITY_STATUS secStatus =
      AcquireCredentialsHandle(NULL, (LPWSTR)pPackage, SECPKG_CRED_BOTH, NULL,
                               NULL, NULL, NULL, &cred, &tsExpiry);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot FreeContextBuffer: secStatus = " +
                                    std::to_string(secStatus));
  }
  logHandle("credentials handle", &cred);
  //   logTimeStamp("tsExpiry=", tsExpiry);

  Napi::Object result = Napi::Object::New(env);
  Napi::Object hCredential = Napi::Object::New(env);
  result["hCredential"] = hCredential;
  hCredential["dwLower"] = Napi::Number::New(env, cred.dwLower);
  hCredential["dwUpper"] = Napi::Number::New(env, cred.dwUpper);
  FILETIME ft;
  memcpy(&ft, &tsExpiry, sizeof(TimeStamp));
  SYSTEMTIME st;
  BOOL status = FileTimeToSystemTime(&ft, &st);
  if (status == FALSE) {
    throw Napi::Error::New(env, "FileTimeToSystemTime failed. status = " +
                                    std::to_string(GetLastError()));
  }
  result["tsExpiry"] = Napi::Date::New(env, TimeStampToUnix(tsExpiry));

  return result;
}

}  // namespace myAddon
