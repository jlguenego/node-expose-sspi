#pragma once;

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>
#include <string>

namespace myAddon {

class Credentials {
 public:
  CredHandle credHandle;
  TimeStamp expiry;

  std::string serialize();
};

}  // namespace myAddon
