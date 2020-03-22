
#include "../../misc.h"
#include "./IADs.h"

namespace myAddon {

Napi::Value e_ADsBuildEnumerator(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  // if (info.Length() < 1) {
  //   throw Napi::Error::New(
  //       env, "ADsBuildEnumerator(bindingUri: string): need a binding string.");
  // }

  // IADsContainer *pCont = NULL;
  // IEnumVARIANT *pEnum = NULL;

  // std::u16string bindingStr = info[0].As<Napi::String>().Utf16Value();
  // LPCWSTR binding = (LPCWSTR)bindingStr.c_str();

  // IADs *pObject;
  // HRESULT hr = ADsBuildEnumerator(pCont, &pEnum);
  // if (FAILED(hr)) {
  //   throw Napi::Error::New(env,
  //                          "error in ADsGetObject: " + plf::ad_error_msg(hr));
  // }

  return Napi::Object::New(env);
}

}  // namespace myAddon
