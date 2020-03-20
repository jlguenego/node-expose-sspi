#pragma once

#include <string>

namespace myAddon {
std::string p2s(void *ptr);
void* s2p(std::string& s);

}  // namespace myAddon
