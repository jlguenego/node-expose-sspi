#include "JS.h"
#include "log.h"

#define WINDOWS_TICK 10000000
#define SEC_TO_UNIX_EPOCH 11644473600LL

#include "Credentials.h"

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

Napi::Array JS::convert(Napi::Env env, unsigned long cPackages,
                        PSecPkgInfo pPackageInfo) {
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

Napi::Object JS::convert(Napi::Env env, Credentials* c) {
  Napi::Object credentials = Napi::Object::New(env);
  credentials["dwLower"] = Napi::Number::New(env, c->credHandle.dwLower);
  credentials["dwUpper"] = Napi::Number::New(env, c->credHandle.dwUpper);
  credentials["tsExpiry"] = JS::convert(env, &c->expiry);
  return credentials;
}

Credentials JS::initCredentials(Napi::Object& credential) {
  Credentials c;
  c.credHandle.dwLower =
      credential.Get("dwLower").As<Napi::Number>().Int64Value();
  c.credHandle.dwUpper =
      credential.Get("dwUpper").As<Napi::Number>().Int64Value();
  return c;
}

PSecBufferDesc JS::initSecBufferDesc() {
  BYTE buffer[cbMaxMessage];
  SecBuffer secBuffer;
  secBuffer.cbBuffer = cbMaxMessage;
  secBuffer.BufferType = SECBUFFER_TOKEN;
  secBuffer.pvBuffer = buffer;

  PSecBufferDesc pSecBufferDesc = new SecBufferDesc();
  pSecBufferDesc->ulVersion = 0;
  pSecBufferDesc->cBuffers = 1;
  pSecBufferDesc->pBuffers = &secBuffer;
  return pSecBufferDesc;
}

PSecBufferDesc JS::initSecBufferDesc(Napi::Object& napiSecBufferDesc) {
  PSecBuffer pSecBuffer = new SecBuffer();
  pSecBuffer->BufferType = SECBUFFER_TOKEN;
  Napi::Array array = napiSecBufferDesc.Get("buffers").As<Napi::Array>();
  Napi::ArrayBuffer obj2 =
      array.Get("0").As<Napi::ArrayBuffer>();
  log("init3.1");
  pSecBuffer->pvBuffer = obj2.Data();
  pSecBuffer->cbBuffer = obj2.ByteLength();
  log("init4");
  PSecBufferDesc pSecBufferDesc = new SecBufferDesc();
  pSecBufferDesc->ulVersion = 0;
  pSecBufferDesc->cBuffers = 1;
  pSecBufferDesc->pBuffers = pSecBuffer;
  return pSecBufferDesc;
}

}  // namespace myAddon