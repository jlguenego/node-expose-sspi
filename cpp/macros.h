#include <atlstr.h>

#define AD_CHECK_ERROR(hr, name)                                            \
  if (FAILED(hr)) {                                                         \
    throw Napi::Error::New(env,                                             \
                           ##name " has failed: " + plf::ad_error_msg(hr)); \
  }

#define CHECK_INPUT(msg, n)              \
  if (info.Length() != n) {           \
    throw Napi::Error::New(env, msg ": Bad arguments"); \
  }