
#include "../../../misc.h"
#include "../IADs.h"

namespace myAddon {

class IADsGetWorker : public Napi::AsyncWorker {
 private:
  Napi::Promise::Deferred m_deferred;
  IADs *m_iads;
  std::u16string m_name;
  std::u16string m_output;

 public:
  IADsGetWorker(Napi::Env &env, Napi::Promise::Deferred &deferred, IADs *iads,
                std::u16string &name)
      : AsyncWorker(env), m_deferred(deferred), m_iads(iads), m_name(name) {}

  ~IADsGetWorker() {}

  // This code will be executed on the worker thread
  void Execute() override {
    Napi::Env env = Env();

    VARIANT var;
    VariantInit(&var);

    HRESULT hr = m_iads->Get(CComBSTR((const wchar_t *)m_name.c_str()), &var);
    if (FAILED(hr)) {
      return SetError("IADs.Get has failed. " + plf::ad_error_msg(hr));
    }

    BSTR bs = V_BSTR(&var);
    m_output = (const char16_t *)bs;
    VariantClear(&var);
  }

  void OnOK() override {
    Napi::Env env = Env();
    Napi::HandleScope scope(env);
    auto result = Napi::String::New(env, m_output);
    m_deferred.Resolve(result);
  }

  void OnError(Napi::Error const &error) override {
    m_deferred.Reject(error.Value());
  }
};

Napi::Value E_IADs::Get(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  auto deferred = Napi::Promise::Deferred::New(env);
  CHECK_INPUT_DEFERRED("IADs.Get(name: string)", 1);

  std::u16string name = info[0].As<Napi::String>().Utf16Value();
  IADsGetWorker *w = new IADsGetWorker(env, deferred, this->iads, name);
  w->Queue();
  return deferred.Promise();
}

}  // namespace myAddon
