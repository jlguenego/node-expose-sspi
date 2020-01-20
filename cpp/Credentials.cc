#include "Credentials.h"

std::string myAddon::Credentials::serialize() {
    return std::to_string(this->credHandle.dwUpper) + "." + std::to_string(this->credHandle.dwLower);
}