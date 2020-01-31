#include "SecHandleUtil.h"

namespace myAddon {

std::string SecHandleUtil::serialize(SecHandle& handle) {
  std::string result =
      std::to_string(handle.dwUpper) + "." + std::to_string(handle.dwLower);
  return result;
}

}  // namespace myAddon
