#include "adsi_error.h"
#include <Activeds.h>


namespace myADSI {

CString GetErrorMessage(HRESULT hr) {
  BOOL bRet;
  CString s;
  LPTSTR lpBuffer = NULL;

  if (SUCCEEDED(hr)) {
    return _T("Success");
  }

  // standard ADSI Errors
  if (hr & 0x00005000) {
    return GetADSIError(hr);
  }
  if (HRESULT_FACILITY(hr) != FACILITY_WIN32) {
    s.Format(_T("0x%08X"), hr);
    return s;
  }
  /////////////////////////////////////////////
  // Retrieve the Win32 Error message
  /////////////////////////////////////////////

  bRet =
      FormatMessage(FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM,
                    NULL, hr, MAKELANGID(LANG_NEUTRAL, SUBLANG_SYS_DEFAULT),
                    (LPTSTR)&lpBuffer, 0, NULL);

  if (!bRet) {
    s.Format(_T("Error %08X"), hr);
    return s;
  }

  if (lpBuffer) {
    s = lpBuffer;
    LocalFree(lpBuffer);
  }

  //////////////////////////////////////////////////////////////////
  //
  // Extended error message may be returned.
  //
  // IADs, IADsContainer, IDirectoryObject or IDirectorySearch may
  // return this extended error message
  //
  /////////////////////////////////////////////////////////////////
  WCHAR szBuffer[MAX_PATH];
  WCHAR szName[MAX_PATH];
  DWORD dwError;

  hr = ADsGetLastError(&dwError, szBuffer,
                       (sizeof(szBuffer) / sizeof(WCHAR)) - 1, szName,
                       (sizeof(szName) / sizeof(WCHAR)) - 1);

  if (SUCCEEDED(hr) && dwError != ERROR_INVALID_DATA && wcslen(szBuffer)) {
    USES_CONVERSION;
    s += _T("  -- Extended Error --- ");
    s += OLE2T(szName);
    s += _T(" : ");
    s += OLE2T(szBuffer);
  }

  return s;
}

typedef struct tagADSERRMSG {
  HRESULT hr;
  LPCTSTR pszError;
} ADSERRMSG;

#define ADDADSERROR(x) x, _T(#x)

ADSERRMSG adsErr[] = {
    ADDADSERROR(E_ADS_BAD_PATHNAME),
    ADDADSERROR(E_ADS_INVALID_DOMAIN_OBJECT),
    ADDADSERROR(E_ADS_INVALID_USER_OBJECT),
    ADDADSERROR(E_ADS_INVALID_COMPUTER_OBJECT),
    ADDADSERROR(E_ADS_UNKNOWN_OBJECT),
    ADDADSERROR(E_ADS_PROPERTY_NOT_SET),
    ADDADSERROR(E_ADS_PROPERTY_NOT_SUPPORTED),
    ADDADSERROR(E_ADS_PROPERTY_INVALID),
    ADDADSERROR(E_ADS_BAD_PARAMETER),
    ADDADSERROR(E_ADS_OBJECT_UNBOUND),
    ADDADSERROR(E_ADS_PROPERTY_NOT_MODIFIED),
    ADDADSERROR(E_ADS_PROPERTY_MODIFIED),
    ADDADSERROR(E_ADS_CANT_CONVERT_DATATYPE),
    ADDADSERROR(E_ADS_PROPERTY_NOT_FOUND),
    ADDADSERROR(E_ADS_OBJECT_EXISTS),
    ADDADSERROR(E_ADS_SCHEMA_VIOLATION),
    ADDADSERROR(E_ADS_COLUMN_NOT_SET),
    ADDADSERROR(E_ADS_INVALID_FILTER),
    ADDADSERROR(0),
};

/////////////////////////////////////////////
//
// Error message specific to ADSI
//
////////////////////////////////////////////
CString GetADSIError(HRESULT hr) {
  CString s;

  if (hr & 0x00005000) {
    int idx = 0;
    while (adsErr[idx].hr != 0) {
      if (adsErr[idx].hr == hr) {
        return adsErr[idx].pszError;
      }
      idx++;
    }
  }

  s.Format(_T("0x%08X"), hr);
  return s;
}

}  // namespace myADSI
