#define NODE_ADDON_API_DISABLE_DEPRECATED 
#include "napi.h"

#include <stdio.h>


#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

namespace myAddon {

napi_value hello(napi_env env, napi_callback_info args) {
  napi_value greeting;
  napi_status status;

  status = napi_create_string_utf8(env, "world", NAPI_AUTO_LENGTH, &greeting);
  if (status != napi_ok) return nullptr;
  return greeting;
}

napi_value e_InitSecurityInterface(napi_env env, napi_callback_info args) {
  napi_value greeting;
  napi_status status;

  printf("about to InitSecurityInterface\n");

  PSecurityFunctionTable ptable = InitSecurityInterface();

  status = napi_create_string_utf8(env, "PSecurityFunctionTable", NAPI_AUTO_LENGTH, &greeting);
  if (status != napi_ok) return nullptr;
  return greeting;
}

napi_value init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, nullptr, 0, hello, nullptr, &fn);
  if (status != napi_ok) return nullptr;

  status = napi_set_named_property(env, exports, "hello", fn);
  if (status != napi_ok) return nullptr;

  status = napi_create_function(env, nullptr, 0, e_InitSecurityInterface, nullptr, &fn);
  if (status != napi_ok) return nullptr;

  status = napi_set_named_property(env, exports, "InitSecurityInterface", fn);
  if (status != napi_ok) return nullptr;

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

}  // namespace demo
