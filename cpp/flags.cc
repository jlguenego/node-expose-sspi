#include "flags.h"

#include <map>
#include <string>

#include <winsock.h>
#define SECURITY_WIN32
#include <Security.h>

#define FIND_FLAG_VALUE(someMap, someValue)                  \
  for (auto it = someMap.begin(); it != someMap.end(); ++it) \
    if (it->second == someValue) return it->first;

#define FLAG_INSERT(map, flag) map[flag] = #flag

std::map<int64_t, std::string> extendedNameFormatMap;
std::map<int64_t, std::string> accessTokenFlagsMap;
std::map<int64_t, std::string> AscReqMap;

void init() {
  FLAG_INSERT(extendedNameFormatMap, NameUnknown);
  FLAG_INSERT(extendedNameFormatMap, NameFullyQualifiedDN);
  FLAG_INSERT(extendedNameFormatMap, NameSamCompatible);
  FLAG_INSERT(extendedNameFormatMap, NameDisplay);
  FLAG_INSERT(extendedNameFormatMap, NameUniqueId);
  FLAG_INSERT(extendedNameFormatMap, NameCanonical);
  FLAG_INSERT(extendedNameFormatMap, NameUserPrincipal);
  FLAG_INSERT(extendedNameFormatMap, NameCanonicalEx);
  FLAG_INSERT(extendedNameFormatMap, NameServicePrincipal);
  FLAG_INSERT(extendedNameFormatMap, NameDnsDomain);
  FLAG_INSERT(extendedNameFormatMap, NameGivenName);
  FLAG_INSERT(extendedNameFormatMap, NameUnknown);
  FLAG_INSERT(extendedNameFormatMap, NameSurname);

  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_DEFAULT);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_GROUPS);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_PRIVILEGES);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_SESSIONID);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ASSIGN_PRIMARY);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_DUPLICATE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_EXECUTE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_IMPERSONATE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_QUERY);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_QUERY_SOURCE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_READ);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_WRITE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ALL_ACCESS);

  FLAG_INSERT(AscReqMap, ASC_REQ_DELEGATE);
  FLAG_INSERT(AscReqMap, ASC_REQ_MUTUAL_AUTH);
  FLAG_INSERT(AscReqMap, ASC_REQ_REPLAY_DETECT);
  FLAG_INSERT(AscReqMap, ASC_REQ_SEQUENCE_DETECT);
  FLAG_INSERT(AscReqMap, ASC_REQ_CONFIDENTIALITY);
  FLAG_INSERT(AscReqMap, ASC_REQ_USE_SESSION_KEY);
  FLAG_INSERT(AscReqMap, ASC_REQ_SESSION_TICKET);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOCATE_MEMORY);
  FLAG_INSERT(AscReqMap, ASC_REQ_USE_DCE_STYLE);
  FLAG_INSERT(AscReqMap, ASC_REQ_DATAGRAM);
  FLAG_INSERT(AscReqMap, ASC_REQ_CONNECTION);
  FLAG_INSERT(AscReqMap, ASC_REQ_CALL_LEVEL);
  FLAG_INSERT(AscReqMap, ASC_REQ_FRAGMENT_SUPPLIED);
  FLAG_INSERT(AscReqMap, ASC_REQ_EXTENDED_ERROR);
  FLAG_INSERT(AscReqMap, ASC_REQ_STREAM);
  FLAG_INSERT(AscReqMap, ASC_REQ_INTEGRITY);
  FLAG_INSERT(AscReqMap, ASC_REQ_LICENSING);
  FLAG_INSERT(AscReqMap, ASC_REQ_IDENTIFY);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_NULL_SESSION);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_NON_USER_LOGONS);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_CONTEXT_REPLAY);
  FLAG_INSERT(AscReqMap, ASC_REQ_FRAGMENT_TO_FIT);
  FLAG_INSERT(AscReqMap, ASC_REQ_NO_TOKEN);
  FLAG_INSERT(AscReqMap, ASC_REQ_PROXY_BINDINGS);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_MISSING_BINDINGS);
  FLAG_INSERT(AscReqMap, ASC_REQ_MESSAGES);
}

namespace myAddon {

int64_t getFlagValue(Napi::Env env, int context, std::string str) {
  static bool initiated = false;
  if (!initiated) {
    init();
  }
  switch (context) {
    case GETFLAG_EXTENDED_NAME_FORMAT:
      FIND_FLAG_VALUE(extendedNameFormatMap, str);
      break;
    case ACCESS_TOKEN_FLAGS:
      FIND_FLAG_VALUE(accessTokenFlagsMap, str);
      break;
    case ASC_REQ_FLAGS:
      FIND_FLAG_VALUE(AscReqMap, str);
      break;
  }
  throw Napi::Error::New(env, "Flag unknown: " + str);
}

int64_t getFlags(Napi::Env env, int context, Napi::Object input, std::string value, int64_t defaultFlags) {
  if (!input.Has(value)) {
    return defaultFlags;
  }
  Napi::Value val = input.Get(value);
  if (!val.IsArray()) {
    throw Napi::Error::New(env, value + " must be a flag string array.");
  }
  Napi::Array flagArray = val.As<Napi::Array>();
  DWORD flags = 0;
  for (uint32_t i = 0; i < flagArray.Length(); i++) {
    std::string flagStr = flagArray.Get(i).As<Napi::String>();
    DWORD flag = getFlagValue(env, context, flagStr);
    flags |= flag;
  }
  return flags;
}

}  // namespace myAddon
