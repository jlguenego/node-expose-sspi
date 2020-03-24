
#include "../../misc.h"
#include "./IADs.h"

namespace myAddon {

class Worker : public Napi::AsyncWorker {
 private:
  Napi::Promise::Deferred m_deferred;
  std::u16string m_binding;
  void *m_pObject;

 public:
  Worker(Napi::Env &env, Napi::Promise::Deferred &deferred, std::u16string &binding)
      : AsyncWorker(env), m_deferred(deferred), m_binding(binding) {
        log("worker created with success");
      }

  ~Worker() {}

  // This code will be executed on the worker thread
  void Execute() override {
    log("execute started");
    Napi::Env env = Env();
    log("thread env ok");
    
    LPCWSTR binding = (LPCWSTR)m_binding.c_str();
    log("thread binding ok");

    HRESULT hr = ADsGetObject(binding, IID_IADs, &m_pObject);
    log("thread binding ok. hr = 0x%08x", hr);
    if (FAILED(hr)) {
      throw Napi::Error::New(env, "putin d'erreur...");
    }
    log("execute finished");
  }

  void OnOK() override {
    log("OnOk start");
    Napi::Env env = Env();
    log("OnOk env");
    Napi::HandleScope scope(env);
    log("OnOk scope");
    auto result = E_IADs::NewInstance(env, Napi::String::New(env, p2s(m_pObject))); 
    log("OnOk result");
    m_deferred.Resolve(result);
    log("OnOk finished");
  }

  void OnError(Napi::Error const &error) {
        m_deferred.Reject(error.Value());
    }
};

Napi::Promise e_ADsGestObject(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  log("start");
  auto deferred = Napi::Promise::Deferred::New(env);
  log("deferred obj created");
  CHECK_INPUT_DEFERRED("ADsGestObject(bindingUri: string)", 1);
  log("input tested");
  std::u16string str = info[0].As<Napi::String>().Utf16Value();
  log("str ok");
  Worker* w = new Worker(env, deferred, str);
  log("worker created");
  w->Queue();
  log("worker queued");
  return deferred.Promise();
}

}  // namespace myAddon
