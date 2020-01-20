#include "JS.h"

namespace myAddon {

Napi::Value JS::convert(Napi::Env env, SecBufferDesc* pSecBufferDesc) {
    return Napi::Array::New(env);
}

}  // namespace myAddon