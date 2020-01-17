#pragma once

#include <codecvt>
#include <locale>

// convert WCHAR_T* to std::string
std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t> converter;
#define FROM_WSTR converter.to_bytes