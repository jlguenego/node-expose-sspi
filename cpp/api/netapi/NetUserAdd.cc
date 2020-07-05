#include "../../misc.h"

namespace myAddon {

void e_NetUserAdd(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT(
      "NetUserAdd(serverName: string, levelData: number, userInfo: UserInfo1)",
      3);
  log("net user add");

  return;
}

}  // namespace myAddon
