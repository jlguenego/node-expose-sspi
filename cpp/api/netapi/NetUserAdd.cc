#include "../../misc.h"

namespace myAddon {

void e_NetUserAdd(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT(
      "NetUserAdd(serverName: string, levelData: number, userInfo: UserInfo1)",
      3);

  if (!info[0].IsString() && !info[0].IsUndefined()) {
    throw Napi::TypeError::New(env, "serverName must be a string or undefined");
  }

  LPCWSTR servername = NULL;
  if (info[0].IsString()) {
    std::u16string str = info[0].As<Napi::String>().Utf16Value();
    servername = (LPCWSTR)str.c_str();
  }

  if (!info[1].IsNumber()) {
    throw Napi::TypeError::New(env,
                               "levelData must be a number (1, 2, 3, or 4)");
  }

  int levelData = info[1].As<Napi::Number>().Int32Value();
  log("levelData = %d", levelData);
  if (levelData != 1) {
    throw Napi::TypeError::New(
        env, "levelData must be 1 (other value 2, 3, 4 not yet supported");
  }

  return;
}

}  // namespace myAddon
