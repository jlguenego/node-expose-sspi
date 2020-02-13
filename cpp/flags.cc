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

std::map<int, std::string> extendedNameFormatMap;
std::map<int, std::string> accessTokenFlagsMap;

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
}

namespace myAddon {

int getFlagValue(Napi::Env env, int context, std::string str) {
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
  }
  throw Napi::Error::New(env, "Flag unknown: " + str);
}

}  // namespace myAddon
