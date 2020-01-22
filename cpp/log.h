#pragma once

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

void log(const char* format, ...);
void logSecPkgInfo(PSecPkgInfo pSecPkgInfo);
void logHandle(const char* prefix, SecHandle* sec);

void logSecBufferDesc(const char* pBuffer, SecBufferDesc* pSecBufferDesc);
void logSecBuffer(const char* pBuffer, SecBuffer* pSecBuffer);

void PrintHexDump(DWORD length, const BYTE* buffer);
