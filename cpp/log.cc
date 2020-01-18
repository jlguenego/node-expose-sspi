#include <stdarg.h>
#include <stdio.h>

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

void log(const char* format, ...) {
  va_list args;
  va_start(args, format);
  vprintf(format, args);
  printf("\n");
  va_end(args);
}

void logSecPkgInfo(PSecPkgInfo pSecPkgInfo) {
  log("fCapabilities=%d", pSecPkgInfo->fCapabilities);
  log("wVersion=%d", pSecPkgInfo->wVersion);
  log("wRPCID=%d", pSecPkgInfo->wRPCID);
  log("cbMaxToken=%d", pSecPkgInfo->cbMaxToken);
  log("Name=%S", pSecPkgInfo->Name);
  log("Comment=%S", pSecPkgInfo->Comment);
}

void logHandle(const char *prefix, SecHandle *sec) {
	printf("%s\n", prefix);
	log("dwLower=%u", sec->dwLower);
	log("dwUpper=%u", sec->dwUpper);
	// Note : I don't know how to display more.
}
