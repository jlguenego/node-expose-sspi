#include "flags.h"

#include <map>
#include <string>

#include <winsock.h>
#define SECURITY_WIN32
#include <Security.h>

#define FIND_FLAG_VALUE(someMap, someValue)                  \
  for (auto it = someMap.begin(); it != someMap.end(); ++it) \
    if (it->second == someValue) return it->first;

std::map<int, std::string> extendedNameFormatMap;

void init() {
  extendedNameFormatMap[NameDisplay] = "NameDisplay";
  extendedNameFormatMap[NameSamCompatible] = "NameSamCompatible";
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
