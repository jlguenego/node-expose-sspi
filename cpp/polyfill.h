#pragma once

#include <stdarg.h>  // For va_start, etc.
#include <memory>    // For std::unique_ptr

#include <windows.h>
#include <stdio.h>

#include <iostream>

#include <memory>
#include <stdexcept>
#include <string>

namespace plf {
// polyfills
std::string string_format(const std::string fmt_str, ...);
std::string error_msg(DWORD code = 0);

}  // namespace plf
