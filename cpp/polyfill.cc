#include "polyfill.h"

namespace plf {

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
  wprintf(L"An error occurred.\n  HRESULT: %x\n", hr);
  // If facility is Win32, get the Win32 error
  if (HRESULT_FACILITY(hr) == FACILITY_WIN32) {
    DWORD dwLastError;
    WCHAR szErrorBuf[MAX_PATH];
    WCHAR szNameBuf[MAX_PATH];
    // Get extended error value.
    HRESULT hr_return = S_OK;
    hr_return = ADsGetLastError(&dwLastError, szErrorBuf, MAX_PATH, szNameBuf,
                                MAX_PATH);
    if (FAILED(hr_return)) {
      return "ADsGetLastError failed.";
    }

    return string_format(
        "(hresult: 0x%08x) (error code: %d) (Error Text: %ws) (Provider: %ws)",
        hr, dwLastError, szErrorBuf, szNameBuf);
  }
  return "Error message not yet handled (TODO)";
}

}  // namespace plf
