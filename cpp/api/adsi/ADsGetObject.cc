
#include "../../misc.h"
#include "./IADs.h"

namespace myAddon {

class ADsGestObjectWorker : public Napi::AsyncWorker {
 private:
  Napi::Promise::Deferred m_deferred;
  std::u16string m_binding;
  void *m_pObject;

 public:
  ADsGestObjectWorker(Napi::Env &env, Napi::Promise::Deferred &deferred,
         std::u16string &binding)
      : AsyncWorker(env), m_deferred(deferred), m_binding(binding) {
  }

  ~ADsGestObjectWorker() {}

  // This code will be executed on the worker thread
  void Execute() override {
    Napi::Env env = Env();

    LPCWSTR binding = (LPCWSTR)m_binding.c_str();

    HRESULT hr = ADsGetObject(binding, IID_IADs, &m_pObject);
    if (FAILED(hr)) {
      return SetError("ADsGetObject has failed. " + plf::ad_error_msg(hr));
    }
  }

  void OnOK() override {
    Napi::Env env = Env();
    Napi::HandleScope scope(env);
    auto result =
        E_IADs::NewInstance(env, Napi::String::New(env, p2s(m_pObject)));
    m_deferred.Resolve(result);
  }

  void OnError(Napi::Error const &error) override {
    m_deferred.Reject(error.Value());
  }
};

Napi::Promise e_ADsGestObject(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  auto deferred = Napi::Promise::Deferred::New(env);
  CHECK_INPUT_DEFERRED("ADsGestObject(bindingUri: string)", 1);
  std::u16string str = info[0].As<Napi::String>().Utf16Value();
  ADsGestObjectWorker *w = new ADsGestObjectWorker(env, deferred, str);
  w->Queue();
  return deferred.Promise();
}

}  // namespace myAddon
