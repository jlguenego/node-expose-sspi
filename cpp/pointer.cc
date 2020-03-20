#include "SecHandleUtil.h"
#include <iomanip>
#include <iostream>
#include <sstream>

using namespace std;

namespace myAddon {

std::string p2s(void *ptr) {
  stringstream s;
  s << "0x" << setfill('0') << setw(sizeof(ULONG_PTR) * 2) << std::hex
     << ptr;
  string result = s.str();
  return result;
}

void* s2p(std::string& s) {
  void *result;
  // remove 0x
  std::string str = s.substr(2);
  std::istringstream c(str);
  c >> std::hex >> result;
  return result;
}

}  // namespace myAddon
