#pragma once

#include <stdarg.h>  // For va_start, etc.
#include <stdio.h>
#include <windows.h>

#include <iostream>
#include <memory>  // For std::unique_ptr
#include <memory>
#include <stdexcept>
#include <string>

// Active Directory
#include <Activeds.h>

namespace plf {
// polyfills
std::string wstring_to_utf8(const std::wstring &str);
std::wstring utf8_to_wstring(const std::string &str);
std::string wstring_to_utf8(const wchar_t *buffer);
std::wstring utf8_to_wstring(const char *buffer);
std::string wstrtostr(const std::wstring &wstr);
std::wstring strtowstr(const std::string &str);

std::string string_format(const std::string fmt_str, ...);
std::string string_format(const std::wstring fmt_str, ...);
std::string error_msg(DWORD code = 0);
std::string ad_error_msg(HRESULT hr);

}  // namespace plf
