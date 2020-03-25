#include "../../misc.h"

namespace myAddon {

Napi::Value e_QuerySecurityPackageInfo(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  CHECK_INPUT("QuerySecurityPackageInfo(name: string)", 1);

  std::u16string packageName = info[0].As<Napi::String>();

  // Enumerates the SSPI packages.
  PSecPkgInfo pPackageInfo = NULL;

  SECURITY_STATUS secStatus =
      QuerySecurityPackageInfo((LPWSTR)packageName.c_str(), &pPackageInfo);
  SSPI_CHECK_ERROR(secStatus, "QuerySecurityPackageInfo");

  Napi::Object result = JS::convert(env, pPackageInfo);

  secStatus = FreeContextBuffer(pPackageInfo);
  SSPI_CHECK_ERROR(secStatus, "FreeContextBuffer");
  return result;
}

}  // namespace myAddon
