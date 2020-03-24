#include <string>

#include "napi.h"

// context flag
#define GETFLAG_EXTENDED_NAME_FORMAT 0
#define ACCESS_TOKEN_FLAGS 1
#define ASC_REQ_FLAGS 2
#define ISC_REQ_FLAGS 3
#define ASC_RET_FLAGS 4
#define ISC_RET_FLAGS 5
#define SECURITY_DREP_FLAGS 6
#define CREDENTIAL_USE_FLAG 7
#define ADS_AUTHENTICATION_FLAGS 8
#define COINIT_FLAGS 9
#define COMPUTER_NAME_FORMAT_FLAGS 10

namespace myAddon {

void initFlags();
int64_t getFlagValue(Napi::Env env, int context, std::string str);
int64_t getFlags(Napi::Env env, int context, Napi::Array flagArray,
                 int64_t defaultFlags = 0);
int64_t getFlags(Napi::Env env, int context, Napi::Object input,
                 std::string value, int64_t defaultFlags = 0);
int64_t getFlag(Napi::Env env, int context, Napi::String flagStr,
                int64_t defaultFlags);
int64_t getFlag(Napi::Env env, int context, Napi::Object input,
                std::string value, int64_t defaultFlags);

Napi::Array setFlags(Napi::Env env, int context, int64_t flags);

}  // namespace myAddon
