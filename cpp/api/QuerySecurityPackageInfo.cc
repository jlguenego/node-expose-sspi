#include "../misc.h"

namespace myAddon {

Napi::Value e_QuerySecurityPackageInfo(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "QuerySecurityPackageInfo: Wrong number of arguments. "
        "AcceptSecurityContext(packageName: string)");
  }

  std::u16string packageName = info[0].As<Napi::String>();

  // Enumerates the SSPI packages.
  PSecPkgInfo pPackageInfo = NULL;

  SECURITY_STATUS secStatus =
      QuerySecurityPackageInfo((LPWSTR)packageName.c_str(), &pPackageInfo);

  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env,
                           "Cannot QuerySecurityPackageInfo: secStatus = " +
                               plf::error_msg(secStatus));
  }

  Napi::Object result = JS::convert(env, pPackageInfo);

  secStatus = FreeContextBuffer(pPackageInfo);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot FreeContextBuffer: secStatus = " +
                                    plf::error_msg(secStatus));
  }

  return result;
}

}  // namespace myAddon
