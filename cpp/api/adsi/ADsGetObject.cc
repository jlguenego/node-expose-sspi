
#include "../../misc.h"
#include "./IADs.h"

#include <atlbase.h>
#include <comutil.h>

namespace myAddon {

Napi::Value e_ADsGestObject(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env, "ADsGestObject(bindingUri: string): need a binding string.");
  }

  std::u16string bindingStr = info[0].As<Napi::String>().Utf16Value();
  LPCWSTR binding = (LPCWSTR)bindingStr.c_str();

  IADs *pObject;
  HRESULT hr = ADsGetObject(binding, IID_IADs, (void **)&pObject);
  if (FAILED(hr)) {
    throw Napi::Error::New(env,
                           "error in ADsGetObject: " + plf::ad_error_msg(hr));
  }

  VARIANT var;
  VariantInit(&var);

  hr = pObject->Get(CComBSTR("sn"), &var);
  if (SUCCEEDED(hr)) {
    std::string str = _bstr_t(V_BSTR(&var));
    VariantClear(&var);
    printf("FullName: %s\n", str.c_str());
    
  }

  return E_IADs::NewInstance(env, Napi::String::New(info.Env(), p2s(pObject)));
}

}  // namespace myAddon
