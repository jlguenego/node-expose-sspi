#include "IDirectorySearch.h"
#include "../../misc.h"

#include "../../pointer.h"
#include "../../polyfill.h"

#include <atlbase.h>
#include <comutil.h>

namespace myAddon {

Napi::FunctionReference E_IDirectorySearch::constructor;

Napi::Object E_IDirectorySearch::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(
      env, "IDirectorySearch",
      {InstanceMethod("Release", &E_IDirectorySearch::Release),
       InstanceMethod("SetSearchPreference",
                      &E_IDirectorySearch::SetSearchPreference),
       InstanceMethod("ExecuteSearch", &E_IDirectorySearch::ExecuteSearch),
       InstanceMethod("GetNextRow", &E_IDirectorySearch::GetNextRow),
       InstanceMethod("GetFirstRow", &E_IDirectorySearch::GetFirstRow),
       InstanceMethod("GetColumn", &E_IDirectorySearch::GetColumn),
       InstanceMethod("GetNextColumnName",
                      &E_IDirectorySearch::GetNextColumnName)});

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("IDirectorySearch", func);
  return exports;
}

E_IDirectorySearch::E_IDirectorySearch(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<E_IDirectorySearch>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  Napi::String str = info[0].As<Napi::String>();
  IDirectorySearch* iDirectorySearch = (IDirectorySearch*)s2p(str.Utf8Value());
  this->iDirectorySearch = iDirectorySearch;
}

Napi::Object E_IDirectorySearch::NewInstance(Napi::Env env, Napi::Value arg) {
  Napi::EscapableHandleScope scope(env);
  Napi::Object obj = constructor.New({arg});
  return scope.Escape(napi_value(obj)).ToObject();
}

void E_IDirectorySearch::Release(const Napi::CallbackInfo& info) {
  this->iDirectorySearch->Release();
}

void E_IDirectorySearch::SetSearchPreference(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  ADS_SEARCHPREF_INFO SearchPrefs;
  SearchPrefs.dwSearchPref = ADS_SEARCHPREF_SEARCH_SCOPE;
  SearchPrefs.vValue.dwType = ADSTYPE_INTEGER;
  SearchPrefs.vValue.Integer = ADS_SCOPE_SUBTREE;
  DWORD dwNumPrefs = 1;

  HRESULT hr =
      this->iDirectorySearch->SetSearchPreference(&SearchPrefs, dwNumPrefs);
  AD_CHECK_ERROR(hr, "SetSearchPreference");
}

void E_IDirectorySearch::ExecuteSearch(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT("ExecuteSearch({filter: string})", 1);

  Napi::Object input = info[0].As<Napi::Object>();

  std::u16string filterStr =
      input.Get("filter").As<Napi::String>().Utf16Value();
  LPWSTR pszSearchFilter = (LPWSTR)filterStr.c_str();

  HRESULT hr = this->iDirectorySearch->ExecuteSearch(
      pszSearchFilter, NULL, (DWORD)-1, &(this->hSearchResult));
  AD_CHECK_ERROR(hr, "ExecuteSearch");
}

Napi::Value E_IDirectorySearch::GetNextRow(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  HRESULT hr = this->iDirectorySearch->GetNextRow(this->hSearchResult);
  AD_CHECK_ERROR(hr, "GetNextRow");
  return Napi::Number::New(env, hr);
}

Napi::Value E_IDirectorySearch::GetFirstRow(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  HRESULT hr = this->iDirectorySearch->GetFirstRow(this->hSearchResult);
  AD_CHECK_ERROR(hr, "GetFirstRow");
  return Napi::Number::New(env, hr);
}

Napi::Value E_IDirectorySearch::GetNextColumnName(
    const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  LPWSTR pszColumnName;
  HRESULT hr = this->iDirectorySearch->GetNextColumnName(this->hSearchResult,
                                                         &pszColumnName);
  AD_CHECK_ERROR(hr, "GetNextColumnName");
  if (hr == S_ADS_NOMORE_COLUMNS) {
    return Napi::Number::New(env, hr);
  }
  Napi::Value result = Napi::String::New(env, (char16_t*)pszColumnName);
  FreeADsMem(pszColumnName);
  return result;
}

class IDirectorySearchWorker : public Napi::AsyncWorker {
 private:
  Napi::Promise::Deferred m_deferred;
  std::u16string m_columnNameStr;
  E_IDirectorySearch* m_iDirectorySearch;
  ADS_SEARCH_COLUMN m_searchColumn;

 public:
  IDirectorySearchWorker(Napi::Env& env, Napi::Promise::Deferred& deferred,
                         std::u16string& columnNameStr,
                         E_IDirectorySearch* iDirectorySearch)
      : AsyncWorker(env),
        m_deferred(deferred),
        m_columnNameStr(columnNameStr),
        m_iDirectorySearch(iDirectorySearch) {}

  ~IDirectorySearchWorker() {}

  // This code will be executed on the worker thread
  void Execute() override {
    Napi::Env env = Env();
    LPWSTR szColumnName = (LPWSTR)m_columnNameStr.c_str();
    HRESULT hr = m_iDirectorySearch->iDirectorySearch->GetColumn(
        m_iDirectorySearch->hSearchResult, szColumnName, &m_searchColumn);
    if (FAILED(hr)) {
      return SetError("GetColumn has failed. " + plf::ad_error_msg(hr));
    }
  }

  void OnOK() override {
    Napi::Env env = Env();
    Napi::HandleScope scope(env);
    Napi::Value result = convertColumn(env, &m_searchColumn);
    m_iDirectorySearch->iDirectorySearch->FreeColumn(&m_searchColumn);
    m_deferred.Resolve(result);
  }

  void OnError(Napi::Error const& error) override {
    m_deferred.Reject(error.Value());
  }
};

Napi::Value E_IDirectorySearch::GetColumn(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  auto deferred = Napi::Promise::Deferred::New(env);
  CHECK_INPUT_DEFERRED("GetColumn(name: string)", 1);

  std::u16string columnNameStr = info[0].As<Napi::String>().Utf16Value();

  IDirectorySearchWorker* w =
      new IDirectorySearchWorker(env, deferred, columnNameStr, this);
  w->Queue();
  return deferred.Promise();
}

}  // namespace myAddon