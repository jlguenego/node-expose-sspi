#include <string>

#include "napi.h"

#define GETFLAG_EXTENDED_NAME_FORMAT 0
#define ACCESS_TOKEN_FLAGS 1
#define ASC_REQ_FLAGS 2

namespace myAddon {

int getFlagValue(Napi::Env env, int context, std::string str);
int getFlags(Napi::Env env, int context, Napi::Object input, std::string value, int defaultFlags = 0);

}  // namespace myAddon
