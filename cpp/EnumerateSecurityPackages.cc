#include "misc.h"

namespace myAddon {

Napi::Value e_EnumerateSecurityPackages(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  Napi::Array result = Napi::Array::New(env);

  // Enumerates the SSPI packages.
  unsigned long cPackages;
  PSecPkgInfo pPackageInfo = NULL;
  SECURITY_STATUS secStatus =
      EnumerateSecurityPackages(&cPackages, &pPackageInfo);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env,
                           "Cannot EnumerateSecurityPackages: secStatus = " +
                               std::to_string(secStatus));
  }
  log("size of pPackageInfo=%d", sizeof(pPackageInfo[0]));
  log("cPackages=%d", cPackages);
  for (unsigned long i = 0; i < cPackages; i++) {
    log("package[%d]=", i);
#pragma warning(disable : 6385)
    logSecPkgInfo(&(pPackageInfo[i]));

    Napi::Object package = Napi::Object::New(env);
    package["fCapabilities"] =
        Napi::Number::New(env, pPackageInfo[i].fCapabilities);
    package["wVersion"] = Napi::Number::New(env, pPackageInfo[i].wVersion);
    package["wRPCID"] = Napi::Number::New(env, pPackageInfo[i].wRPCID);
    package["cbMaxToken"] = Napi::Number::New(env, pPackageInfo[i].cbMaxToken);
    package["Name"] = Napi::String::New(env, (char16_t *)pPackageInfo[i].Name);
    package["Comment"] =
        Napi::String::New(env, (char16_t *)pPackageInfo[i].Comment);

    std::string strI = std::to_string(i);
    result[strI] = package;
  }

  secStatus = FreeContextBuffer(pPackageInfo);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot FreeContextBuffer: secStatus = " +
                                    std::to_string(secStatus));
  }

  return result;
}

}  // namespace myAddon
