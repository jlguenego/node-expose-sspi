#include <stdarg.h>
#include <stdio.h>

#include <winsock.h>
#define SECURITY_WIN32
#include <sspi.h>

#include "log.h"

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

void logSecBufferDesc(const char *pBuffer, SecBufferDesc *pSecBufferDesc) {
	printf("%s\n", pBuffer);
	const int total = pSecBufferDesc->cBuffers;
	for (int i = 0; i < total; i++) {
		log("SecBuffer #%d", i);
		logSecBuffer("SecBuffer content", &(pSecBufferDesc->pBuffers)[i]);
	}
}

void logSecBuffer(const char* pBuffer, SecBuffer* pSecBuffer) {
	printf("%s\n", pBuffer);
	printf("buffer size: %d\n", pSecBuffer->cbBuffer);
	PrintHexDump(pSecBuffer->cbBuffer, (BYTE*) pSecBuffer->pvBuffer);
}

void PrintHexDump(
	DWORD length,
	const BYTE* buffer)
{
	DWORD i, count, index;
	CHAR rgbDigits[] = "0123456789abcdef";
	CHAR rgbLine[100];
	char cbLine;

	for (index = 0; length;
		length -= count, buffer += count, index += count)
	{
		count = (length > 16) ? 16 : length;

		sprintf_s(rgbLine, 100, "%4.4x  ", index);
		cbLine = 6;

		for (i = 0;i < count;i++)
		{
			rgbLine[cbLine++] = rgbDigits[buffer[i] >> 4];
			rgbLine[cbLine++] = rgbDigits[buffer[i] & 0x0f];
			if (i == 7)
			{
				rgbLine[cbLine++] = ':';
			}
			else
			{
				rgbLine[cbLine++] = ' ';
			}
		}
		for (; i < 16; i++)
		{
			rgbLine[cbLine++] = ' ';
			rgbLine[cbLine++] = ' ';
			rgbLine[cbLine++] = ' ';
		}

		rgbLine[cbLine++] = ' ';

		for (i = 0; i < count; i++)
		{
			if (buffer[i] < 32 || buffer[i] > 126)
			{
				rgbLine[cbLine++] = '.';
			}
			else
			{
				rgbLine[cbLine++] = buffer[i];
			}
		}

		rgbLine[cbLine++] = 0;
		printf("%s\n", rgbLine);
	}
}
