#include "SecHandleUtil.h"
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
  s1 = s1.substr(2);
  s2 = s2.substr(2);
  cout << "s1=" << s1 << endl;
  cout << "s2=" << s2 << endl;

  std::istringstream c1(s1);
  c1 >> std::hex >> result.dwUpper;
  std::istringstream c2(s2);
  c2 >> std::hex >> result.dwLower;
  return result;
}

}  // namespace myAddon
