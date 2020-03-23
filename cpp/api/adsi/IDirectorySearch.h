#pragma once

#include <napi.h>
#include <Iads.h>

namespace myAddon {

class E_IDirectorySearch : public Napi::ObjectWrap<E_IDirectorySearch> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  static Napi::Object NewInstance(Napi::Env env, Napi::Value arg);
  E_IDirectorySearch(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  void Release(const Napi::CallbackInfo& info);
  void SetSearchPreference(const Napi::CallbackInfo& info);
  void ExecuteSearch(const Napi::CallbackInfo& info);
  Napi::Value GetNextRow(const Napi::CallbackInfo& info);
  Napi::Value GetFirstRow(const Napi::CallbackInfo& info);
  Napi::Value GetNextColumnName(const Napi::CallbackInfo& info);
  Napi::Value GetColumn(const Napi::CallbackInfo& info);

  IDirectorySearch* iDirectorySearch;
  ADS_SEARCH_HANDLE hSearchResult;
};

}  // namespace myAddon