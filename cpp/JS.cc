#include "JS.h"

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

}  // namespace myAddon