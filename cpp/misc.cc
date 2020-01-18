#include "misc.h"

#define WINDOWS_TICK 10000000
#define SEC_TO_UNIX_EPOCH 11644473600LL

namespace myAddon {

double TimeStampToUnix(TimeStamp ts) {
  double result = (double)(ts.QuadPart / WINDOWS_TICK - SEC_TO_UNIX_EPOCH);
  return (double)result * 1000;
}

}  // namespace myAddon
