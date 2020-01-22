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
  Napi::Object result = Napi::Object::New(env);
  double secondsSince1970 = (double)(pTimeStamp->QuadPart / WINDOWS_TICK - SEC_TO_UNIX_EPOCH);
  return Napi::Date::New(env, secondsSince1970 * 1000);
}

}  // namespace myAddon