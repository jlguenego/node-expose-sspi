#include "SecHandleUtil.h"
#include "pointer.h"
#include <iomanip>
#include <iostream>
#include <sstream>

using namespace std;

namespace myAddon {

std::string SecHandleUtil::serialize(SecHandle& handle) {
  stringstream sa;
  sa << "0x" << setfill('0') << setw(sizeof(ULONG_PTR) * 2) << std::hex
     << handle.dwUpper;
  stringstream sb;
  sb << "0x" << setfill('0') << setw(sizeof(ULONG_PTR) * 2) << std::hex
     << handle.dwLower;
  string result = sa.str() + "." + sb.str();
  return result;
}

SecHandle SecHandleUtil::deserialize(std::string& s) {
  SecHandle result = {0, 0};
  string s1 = s.substr(0, s.find("."));
  string s2 = s.substr(s.find(".") + 1);
  result.dwUpper = (ULONG_PTR) s2p(s1);
  result.dwLower = (ULONG_PTR) s2p(s2);
  return result;
}

}  // namespace myAddon
