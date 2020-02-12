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
  }
  throw Napi::Error::New(env, "Flag unknown: " + str);
}

}  // namespace myAddon
