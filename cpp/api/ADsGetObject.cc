
#include "../misc.h"

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
  HRESULT hr;

  // Initialize COM.
  CoInitialize(NULL);

  hr = ADsGetObject(binding, IID_IADs, (void **)&pObject);

  if (FAILED(hr)) {
    // clean resources
    CoUninitialize();
    throw Napi::Error::New(env,
                           "error in ADsGetObject: " + plf::ad_error_msg(hr));
  }

  // Use the object.
  BSTR bstrName;

  // Get property.
  hr = pObject->get_Name(&bstrName);
  if (SUCCEEDED(hr)) {
    wprintf(bstrName);

    SysFreeString(bstrName);
  }

  // Release the object.
  pObject->Release();

  // Uninitialize COM.
  CoUninitialize();

  Napi::Object result = Napi::Object::New(env);
  return result;
}

}  // namespace myAddon
