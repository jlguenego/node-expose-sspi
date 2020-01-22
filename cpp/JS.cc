#include "JS.h"

#define WINDOWS_TICK 10000000
#define SEC_TO_UNIX_EPOCH 11644473600LL

namespace myAddon {

Napi::Value JS::convert(Napi::Env env, SecBufferDesc* pSecBufferDesc) {
  Napi::Object result = Napi::Object::New(env);
  result["ulVersion"] = pSecBufferDesc->ulVersion;
  Napi::Array array = Napi::Array::New(env);
  for (unsigned long i = 0; i < pSecBufferDesc->cBuffers; i++) {
    Napi::ArrayBuffer buffer =
        Napi::ArrayBuffer::New(env, pSecBufferDesc->pBuffers[i].pvBuffer,
                               pSecBufferDesc->pBuffers[i].cbBuffer);
    array[std::to_string(i)] = buffer;
  }
  result["buffers"] = array;
  return result;
}

Napi::Value JS::convert(Napi::Env env, TimeStamp* pTimeStamp) {
  double secondsSince1970 =
      (double)(pTimeStamp->QuadPart / WINDOWS_TICK - SEC_TO_UNIX_EPOCH);
  return Napi::Date::New(env, secondsSince1970 * 1000);
}

Napi::Array JS::convert(Napi::Env env, unsigned long cPackages, PSecPkgInfo pPackageInfo) {
  Napi::Array result = Napi::Array::New(env);
  for (unsigned long i = 0; i < cPackages; i++) {
    
    Napi::Object package = Napi::Object::New(env);
    package["fCapabilities"] =
        Napi::Number::New(env, pPackageInfo[i].fCapabilities);
    package["wVersion"] = Napi::Number::New(env, pPackageInfo[i].wVersion);
    package["wRPCID"] = Napi::Number::New(env, pPackageInfo[i].wRPCID);
    package["cbMaxToken"] = Napi::Number::New(env, pPackageInfo[i].cbMaxToken);
    package["Name"] = Napi::String::New(env, (char16_t*)pPackageInfo[i].Name);
    package["Comment"] =
        Napi::String::New(env, (char16_t*)pPackageInfo[i].Comment);

    std::string strI = std::to_string(i);
    result[strI] = package;
  }
  return result;
}

Napi::Object JS::convert(Napi::Env env, Credentials *c) {
 Napi::Object credentials = Napi::Object::New(env);
  credentials["dwLower"] = Napi::Number::New(env, c->credHandle.dwLower);
  credentials["dwUpper"] = Napi::Number::New(env, c->credHandle.dwUpper);
  credentials["tsExpiry"] = JS::convert(env, &c->expiry);
  return credentials;
}

}  // namespace myAddon