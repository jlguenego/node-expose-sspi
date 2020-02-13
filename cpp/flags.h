#include <string>

#include "napi.h"

#define GETFLAG_EXTENDED_NAME_FORMAT 0
#define ACCESS_TOKEN_FLAGS 1

namespace myAddon {

int getFlagValue(Napi::Env env, int context, std::string str);

}  // namespace myAddon
