#define CHECK_ERROR(status, name)                                            \
  if (!status) {                                                             \
    throw Napi::Error::New(env, ##name " has failed: " + plf::error_msg(0)); \
  }

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

#define AD_CHECK_ERROR_ASYNC(hr, name)                               \
  if (FAILED(hr)) {                                                  \
    return SetError(##name " has failed: " + plf::ad_error_msg(hr)); \
  }

#define SSPI_CHECK_ERROR(secStatus, name)                         \
  if (secStatus != SEC_E_OK) {                                    \
    throw Napi::Error::New(                                       \
        env, ##name " has failed: " + plf::error_msg(secStatus)); \
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

#define CHECK_PROP(input, key, IsTypeFn)                            \
  if (!input.Has(key)) {                                            \
    throw Napi::TypeError::New(env, key " not found");              \
  }                                                                 \
  if (!input.Get(key).IsTypeFn()) {                                 \
    throw Napi::TypeError::New(env, key ": " #IsTypeFn " failed."); \
  }

#define CHECK_PROP_OPTIONAL(input, key, IsTypeFn)                   \
  if (input.Has(key) && !input.Get(key).IsTypeFn()) {               \
    throw Napi::TypeError::New(env, key ": " #IsTypeFn " failed."); \
  }
