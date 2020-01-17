#pragma once

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

void log(const char* format, ...);
void logSecPkgInfo(PSecPkgInfo pSecPkgInfo);