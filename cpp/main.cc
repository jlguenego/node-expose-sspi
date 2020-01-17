#define NODE_ADDON_API_DISABLE_DEPRECATED
#include "napi.h"

#include <stdio.h>

#include <string>

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

#include "log.h"

namespace myAddon {

Napi::Value hello(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Coucou JL!!!");
}

Napi::Value e_EnumerateSecurityPackages(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  Napi::Array result = Napi::Array::New(env);

  // Enumerates the SSPI packages.
  unsigned long cPackages;
  PSecPkgInfo pPackageInfo = NULL;
  SECURITY_STATUS secStatus =
      EnumerateSecurityPackages(&cPackages, &pPackageInfo);
  if (secStatus != SEC_E_OK) {
    // TODO: throw an exception
  }
  log("size of pPackageInfo=%d", sizeof(pPackageInfo[0]));
  log("cPackages=%d", cPackages);
  for (unsigned long i = 0; i < cPackages; i++) {
    log("package[%d]=", i);
#pragma warning(disable : 6385)
    logSecPkgInfo(&(pPackageInfo[i]));

	Napi::Object package = Napi::Object::New(env);
	std::wstring ws(pPackageInfo[i].Name);
	std::string str(ws.begin(), ws.end());
	package["Name"] = Napi::String::New(env, str);

	std::string strI = std::to_string(i);
    result[strI] = package;
  }

  secStatus = FreeContextBuffer(pPackageInfo);
  if (secStatus != SEC_E_OK) {
    // TODO: throw an exception.
  }

  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, hello));

  exports.Set(Napi::String::New(env, "EnumerateSecurityPackages"),
              Napi::Function::New(env, e_EnumerateSecurityPackages));

  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace myAddon
