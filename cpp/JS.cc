#include "JS.h"
#include "log.h"
#include "polyfill.h"

#define WINDOWS_TICK 10000000
#define SEC_TO_UNIX_EPOCH 11644473600LL

namespace myAddon {

Napi::Value JS::convert(Napi::Env env, SecBufferDesc* pSecBufferDesc) {
  Napi::Object result = Napi::Object::New(env);
  if (!pSecBufferDesc) {
    result["ulVersion"] = SECBUFFER_VERSION;
    result["buffers"] = Napi::Array::New(env);
    return result;
  }
  result["ulVersion"] = pSecBufferDesc->ulVersion;
  Napi::Array array = Napi::Array::New(env);
  for (unsigned long i = 0; i < pSecBufferDesc->cBuffers; i++) {
    Napi::ArrayBuffer buffer =
        Napi::ArrayBuffer::New(env, pSecBufferDesc->pBuffers[i].cbBuffer);
    memcpy(buffer.Data(), pSecBufferDesc->pBuffers[i].pvBuffer,
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
    Napi::Object package = JS::convert(env, &pPackageInfo[i]);
    std::string strI = std::to_string(i);
    result[strI] = package;
  }
  return result;
}

Napi::Object JS::convert(Napi::Env env, PSecPkgInfo pPackageInfo) {
  Napi::Object package = Napi::Object::New(env);
  std::string capabilities =
      plf::string_format("0x%08x", pPackageInfo->fCapabilities);
  package["fCapabilities"] = Napi::String::New(env, capabilities);
  package["wVersion"] = Napi::Number::New(env, pPackageInfo->wVersion);
  package["wRPCID"] = Napi::Number::New(env, pPackageInfo->wRPCID);
  package["cbMaxToken"] = Napi::Number::New(env, pPackageInfo->cbMaxToken);
  package["Name"] = Napi::String::New(env, (char16_t*)pPackageInfo->Name);
  package["Comment"] = Napi::String::New(env, (char16_t*)pPackageInfo->Comment);

  return package;
}

PSecBufferDesc JS::initSecBufferDesc() {
  BYTE* buffer = (BYTE*)malloc(cbMaxMessage * sizeof(BYTE));
  PSecBuffer pSecBuffer = new SecBuffer();
  pSecBuffer->cbBuffer = cbMaxMessage;
  pSecBuffer->BufferType = SECBUFFER_TOKEN;
  pSecBuffer->pvBuffer = buffer;

  PSecBufferDesc pSecBufferDesc = new SecBufferDesc();
  pSecBufferDesc->ulVersion = 0;
  pSecBufferDesc->cBuffers = 1;
  pSecBufferDesc->pBuffers = pSecBuffer;
  return pSecBufferDesc;
}

PSecBufferDesc JS::initSecBufferDesc(Napi::Object& napiSecBufferDesc) {
  PSecBuffer pSecBuffer = new SecBuffer();
  pSecBuffer->BufferType = SECBUFFER_TOKEN;
  Napi::Array array = napiSecBufferDesc.Get("buffers").As<Napi::Array>();
  Napi::ArrayBuffer obj = array.Get("0").As<Napi::ArrayBuffer>();

  pSecBuffer->pvBuffer = obj.Data();

  pSecBuffer->cbBuffer = obj.ByteLength();
  PSecBufferDesc pSecBufferDesc = new SecBufferDesc();
  pSecBufferDesc->ulVersion = 0;
  pSecBufferDesc->cBuffers = 1;
  pSecBufferDesc->pBuffers = pSecBuffer;
  return pSecBufferDesc;
}

Napi::Object JS::fromLuid(Napi::Env env, LUID* pLUID) {
  Napi::Object result = Napi::Object::New(env);
  result["LowPart"] = Napi::Number::New(env, pLUID->LowPart);
  result["HighPart"] = Napi::Number::New(env, pLUID->HighPart);
  return result;
}

LUID JS::toLuid(Napi::Object value) {
  LUID result;
  result.LowPart = value.Get("LowPart").As<Napi::Number>().Uint32Value();
  result.HighPart = value.Get("HightPart").As<Napi::Number>().Int32Value();
  return result;
}

}  // namespace myAddon