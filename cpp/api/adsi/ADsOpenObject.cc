
#include "../../misc.h"
#include "./IADs.h"
#include "./IADsContainer.h"
#include "./IDirectorySearch.h"

namespace myAddon {

class ADsOpenObjectWorker : public Napi::AsyncWorker {
 private:
  Napi::Promise::Deferred m_deferred;
  std::u16string m_binding;
  std::u16string m_user;
  std::u16string m_password;
  DWORD m_flag;
  IID m_riid;

  void *m_pObject;

 public:
  ADsOpenObjectWorker(Napi::Env &env, Napi::Promise::Deferred &deferred,
         std::u16string &binding, std::u16string &user,
         std::u16string &password, DWORD flag, IID riid)
      : AsyncWorker(env),
        m_deferred(deferred),
        m_binding(binding),
        m_user(user),
        m_password(password),
        m_flag(flag),
        m_riid(riid) {}

  ~ADsOpenObjectWorker() {}

  // This code will be executed on the worker thread
  void Execute() override {
    log("start execute");
    Napi::Env env = Env();

    LPCWSTR binding = (LPCWSTR)m_binding.c_str();

    LPCWSTR user = NULL;
    if (!m_user.empty()) {
      user = (LPCWSTR)m_user.c_str();
    }

    LPCWSTR password = NULL;
    if (!m_password.empty()) {
      password = (LPCWSTR)m_password.c_str();
    }

    log("about to call ADsOpenObject");
    HRESULT hr =
        ADsOpenObject(binding, user, password, m_flag, m_riid, &m_pObject);
    log("hr = 0x%08x", hr);
    if (FAILED(hr)) {
      return SetError("ADsOpenObject has failed. " + plf::ad_error_msg(hr));
    }
    log("execute finished");
  }

  void OnOK() override {
    Napi::Env env = Env();
    Napi::HandleScope scope(env);

    Napi::String s = Napi::String::New(env, p2s(m_pObject));
    Napi::Value result;

    log("about to result");

    if (m_riid == IID_IADsContainer) {
      result = E_IADsContainer::NewInstance(env, s);
    }
    if (m_riid == IID_IDirectorySearch) {
      result = E_IDirectorySearch::NewInstance(env, s);
    }
    if (m_riid == IID_IADs) {
      log("return new E_IADs instance");
      result = E_IADs::NewInstance(env, s);
    }
    m_deferred.Resolve(result);
  }

  void OnError(Napi::Error const &error) override {
    m_deferred.Reject(error.Value());
  }
};

Napi::Value e_ADsOpenObject(const Napi::CallbackInfo &info) {
  log("start e_ADsOpenObject");
  Napi::Env env = info.Env();
  auto deferred = Napi::Promise::Deferred::New(env);
  CHECK_INPUT_DEFERRED(
      "ADsOpenObject({\n"
      "bindingUri: string,\n"
      "user?: string,\n"
      "password?: string\n"
      "adsAuthentication?: ADS_AUTHENTICATION_ENUM,\n"
      "riid?: IIDClass\n"
      "})",
      1);

  log("check input ok");
  Napi::Object input = info[0].As<Napi::Object>();

  std::u16string binding = input.Get("binding").As<Napi::String>().Utf16Value();

  std::u16string user;
  if (input.Has("user")) {
    std::u16string user = input.Get("user").As<Napi::String>().Utf16Value();
  }

  std::u16string password;
  if (input.Has("password")) {
    std::u16string password =
        input.Get("password").As<Napi::String>().Utf16Value();
  }

  DWORD flag = getFlag(env, ADS_AUTHENTICATION_FLAGS, input,
                       "authenticationFlag", ADS_SECURE_AUTHENTICATION);

  IID riid = IID_IADs;
  if (input.Has("riid")) {
    std::string outputTypeStr =
        input.Get("riid").As<Napi::String>().Utf8Value();
    if (outputTypeStr == "IID_IADsContainer") {
      riid = IID_IADsContainer;
    }
    if (outputTypeStr == "IID_IDirectorySearch") {
      riid = IID_IDirectorySearch;
    }
  }

  log("about to init worker");
  ADsOpenObjectWorker *w = new ADsOpenObjectWorker(env, deferred, binding, user, password, flag, riid);
  log("about to queue");
  w->Queue();
  return deferred.Promise();
}

}  // namespace myAddon
