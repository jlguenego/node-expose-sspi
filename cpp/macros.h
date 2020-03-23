#include <atlstr.h>

#define AD_CHECK_ERROR(hr, name)                                            \
  if (FAILED(hr)) {                                                         \
    throw Napi::Error::New(env,                                             \
                           ##name " has failed: " + plf::ad_error_msg(hr)); \
  }

#define AD_CHECK_ERROR_DEFERRED(hr, name)                                     \
  if (FAILED(hr)) {                                                           \
    deferred.Reject(                                                          \
        Napi::Error::New(env, ##name " has failed: " + plf::ad_error_msg(hr)) \
            .Value());                                                        \
    return deferred.Promise();                                                \
  }

#define CHECK_INPUT(msg, n)                                 \
  if (info.Length() != n) {                                 \
    throw Napi::TypeError::New(env, msg ": Bad arguments"); \
  }

#define CHECK_INPUT_DEFERRED(msg, n)                                           \
  if (info.Length() != n) {                                                    \
    deferred.Reject(Napi::TypeError::New(env, msg ": Bad arguments").Value()); \
    return deferred.Promise();                                                 \
  }
