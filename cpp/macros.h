#include <atlstr.h>

#define AD_CHECK_ERROR(hr, name)                                               \
  if (FAILED(hr)) {                                                         \
    throw Napi::Error::New(env,                                             \
                           ##name " has failed: " + plf::ad_error_msg(hr)); \
  }
