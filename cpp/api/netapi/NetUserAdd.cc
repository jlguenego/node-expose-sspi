#include <windows.h>
#include <lmaccess.h>
#include <lmapibuf.h>
#include <lmcons.h>
#include <lmerr.h>
#include <stdio.h>
#include <stdlib.h>

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

  DWORD levelData = info[1].As<Napi::Number>().Int32Value();
  if (levelData != 1) {
    throw Napi::TypeError::New(
        env, "levelData must be 1 (other value 2, 3, 4 not yet supported");
  }

  if (!info[2].IsObject()) {
    throw Napi::TypeError::New(
        env, "userInfo must be an object satisfying the UserInfo1 interface");
  }

  Napi::Object userInfo = info[2].As<Napi::Object>();

  std::u16string name = userInfo.Get("name").As<Napi::String>().Utf16Value();
  std::u16string password =
      userInfo.Get("password").As<Napi::String>().Utf16Value();

  USER_INFO_1 user_info;
  user_info.usri1_name = (LPWSTR)name.c_str();
  user_info.usri1_password = (LPWSTR)password.c_str();
  user_info.usri1_priv = USER_PRIV_USER;
  user_info.usri1_home_dir = TEXT("");
  user_info.usri1_comment = TEXT("Sample User");
  user_info.usri1_flags = UF_SCRIPT;
  user_info.usri1_script_path = TEXT("");

  DWORD parm_err = 0;

  NET_API_STATUS err =
      NetUserAdd(servername, levelData, (LPBYTE)&user_info, &parm_err);

  if (err > 0) {
    std::string msg;
    switch (err) {
      case 5:
        msg = "Access is denied. Creating user needs administrator privileges.";
        break;
      case NERR_UserExists:
        msg = "User already exists.";
        break;
      case ERROR_INVALID_PARAMETER:
        msg = plf::string_format(
            "Invalid parameter error adding user; parameter index = %d\n",
            parm_err);
        break;
      default:
        msg = plf::string_format("Error adding user: %d\n", err);
    }
    throw Napi::TypeError::New(env, msg);
  }

  return;
}

}  // namespace myAddon
