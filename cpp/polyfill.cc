#include "polyfill.h"

#include <codecvt>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

#include "adsi_error.h"

namespace plf {

// https://stackoverflow.com/questions/215963/how-do-you-properly-use-widechartomultibyte
std::string wstrtostr(const std::wstring &wstr) {
  // Convert a Unicode string to an ASCII string
  std::string strTo;
  char *szTo = new char[wstr.length() + 1];
  szTo[wstr.size()] = '\0';
  WideCharToMultiByte(CP_ACP, 0, wstr.c_str(), -1, szTo, (int)wstr.length(),
                      NULL, NULL);
  strTo = szTo;
  delete[] szTo;
  return strTo;
}

std::wstring strtowstr(const std::string &str) {
  // Convert an ASCII string to a Unicode String
  std::wstring wstrTo;
  wchar_t *wszTo = new wchar_t[str.length() + 1];
  wszTo[str.size()] = L'\0';
  MultiByteToWideChar(CP_ACP, 0, str.c_str(), -1, wszTo, (int)str.length());
  wstrTo = wszTo;
  delete[] wszTo;
  return wstrTo;
}

// https://stackoverflow.com/questions/4358870/convert-wstring-to-string-encoded-in-utf-8
std::string wstring_to_utf8(const std::wstring &wstr) {
  std::wstring_convert<std::codecvt_utf8<wchar_t>> myconv;
  return myconv.to_bytes(wstr);
}

std::wstring utf8_to_wstring(const std::string &str) {
  std::wstring_convert<std::codecvt_utf8<wchar_t>> myconv;
  return myconv.from_bytes(str);
}

std::string wstring_to_utf8(const wchar_t *buffer) {
  std::wstring_convert<std::codecvt_utf8<wchar_t>> myconv;
  return myconv.to_bytes(buffer);
}

std::wstring utf8_to_wstring(const char *buffer) {
  std::wstring_convert<std::codecvt_utf8<wchar_t>> myconv;
  return myconv.from_bytes(buffer);
}

// See
// https://stackoverflow.com/questions/2342162/stdstring-formatting-like-sprintf
std::string string_format(const std::string fmt_str, ...) {
  int final_n,
      n = ((int)fmt_str.size()) *
          2; /* Reserve two times as much as the length of the fmt_str */
  std::unique_ptr<char[]> formatted;
  va_list ap;
  while (1) {
    formatted.reset(
        new char[n]); /* Wrap the plain char array into the unique_ptr */
    strcpy(&formatted[0], fmt_str.c_str());
    va_start(ap, fmt_str);
    final_n = vsnprintf(&formatted[0], n, fmt_str.c_str(), ap);
    va_end(ap);
    if (final_n < 0 || final_n >= n)
      n += abs(final_n - n + 1);
    else
      break;
  }
  return std::string(formatted.get());
}

// same for std::u16string
std::string string_format(const std::wstring &fmt_str, ...) {
  return wstring_to_utf8(L"");
}

std::string error_msg(DWORD code) {
  if (code == 0) {
    code = GetLastError();
  }
  char buffer[512];  // Buffer for text.

  DWORD dwChars =
      FormatMessageA(FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
                     NULL, code, 0, buffer, 512, NULL);

  std::string str = string_format("(error code: 0x%08x) ", code) + buffer;
  return str;
}

std::string ad_error_msg(HRESULT hr) {
  CString cs = myADSI::GetErrorMessage(hr);
  // convert the CString to std::string
  CT2CA a(cs);
  std::string result(a);
  return result;
}

}  // namespace plf
