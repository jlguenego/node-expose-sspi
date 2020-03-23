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
       InstanceMethod("GetNextColumnName", &E_IDirectorySearch::GetNextColumnName)});

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
  if (FAILED(hr)) {
    throw Napi::Error::New(
        env, "SetSearchPreference failed." + plf::ad_error_msg(hr));
  }
}

void E_IDirectorySearch::ExecuteSearch(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 1) {
    throw Napi::Error::New(env,
                           "ExecuteSearch({filter: string}): bad arguments.");
  }

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

Napi::Value E_IDirectorySearch::GetNextColumnName(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  LPWSTR pszColumnName;
  HRESULT hr = this->iDirectorySearch->GetNextColumnName(this->hSearchResult,
                                                         &pszColumnName);
  AD_CHECK_ERROR(hr, "GetNextColumnName");
  if (hr == S_ADS_NOMORE_COLUMNS) {
    return Napi::Number::New(env, hr);
  }
  Napi::Value result = Napi::String::New(env, (char16_t *) pszColumnName);
  FreeADsMem(pszColumnName);
  return result;
}

}  // namespace myAddon