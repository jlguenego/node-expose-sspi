#include <windows.h>
#include <lmaccess.h>
#include <lmapibuf.h>
#include <lmcons.h>
#include <lmerr.h>
#include <stdio.h>
#include <stdlib.h>

#include "../../misc.h"

namespace myAddon {

void e_NetUserDel(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  CHECK_INPUT("NetUserAdd(serverName: string, username: string)", 2);

  if (!info[0].IsString() && !info[0].IsUndefined()) {
    throw Napi::TypeError::New(env, "serverName must be a string or undefined");
  }

  LPCWSTR servername = NULL;
  if (info[0].IsString()) {
    std::u16string str = info[0].As<Napi::String>().Utf16Value();
    servername = (LPCWSTR)str.c_str();
  }

  if (!info[1].IsString()) {
    throw Napi::TypeError::New(env, "username must be a string");
  }

  std::u16string str = info[1].As<Napi::String>().Utf16Value();
  LPCWSTR username = (LPCWSTR)str.c_str();

  NET_API_STATUS err = NetUserDel(servername, username);

  if (err > 0) {
    std::string msg;
    switch (err) {
      case ERROR_ACCESS_DENIED:
        msg = "Access is denied. Creating user needs administrator privileges.";
        break;
      case NERR_InvalidComputer:
        msg = "Computer name is invalid.";
        break;
      case NERR_NotPrimary:
        msg =
            "The operation is allowed only on the primary domain controller of "
            "the domain.";
        break;
      case NERR_UserNotFound:
        msg = "The user name could not be found.";
        break;
      default:
        msg = plf::string_format("Error deleting user: %d\n", err);
    }
    throw Napi::Error::New(env, msg);
  }

  return;
}

}  // namespace myAddon
