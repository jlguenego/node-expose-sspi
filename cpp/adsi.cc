#include "adsi.h"

#include <sddl.h>

namespace myAddon {
Napi::Value convertColumn(Napi::Env env, PADS_SEARCH_COLUMN pCol) {
  DWORD x;
  Napi::Array result;
  switch (pCol->dwADsType) {
    case ADSTYPE_DN_STRING:
      // return a string array
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        result[std::to_string(x)] =
            Napi::String::New(env, (char16_t *)pCol->pADsValues[x].DNString);
      }
      return result;
    case ADSTYPE_CASE_EXACT_STRING:
    case ADSTYPE_CASE_IGNORE_STRING:
    case ADSTYPE_PRINTABLE_STRING:
    case ADSTYPE_NUMERIC_STRING:
    case ADSTYPE_TYPEDNAME:
    case ADSTYPE_FAXNUMBER:
    case ADSTYPE_PATH:
      // return a string array
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        result[std::to_string(x)] = Napi::String::New(
            env, (char16_t *)pCol->pADsValues[x].CaseIgnoreString);
      }
      return result;
    case ADSTYPE_BOOLEAN:
      // return a boolean array
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        result[std::to_string(x)] =
            Napi::Boolean::New(env, pCol->pADsValues[x].Boolean ? true : false);
      }
      return result;
    case ADSTYPE_INTEGER:
      // return a number array
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        result[std::to_string(x)] =
            Napi::Number::New(env, (double)pCol->pADsValues[x].Integer);
      }
      return result;
    case ADSTYPE_OCTET_STRING:
      if (_wcsicmp(pCol->pszAttrName, L"objectSID") == 0) {
        result = Napi::Array::New(env);
        for (x = 0; x < pCol->dwNumValues; x++) {
          PSID pObjectSID = (PSID)(pCol->pADsValues[x].OctetString.lpValue);
          //  Convert SID to string.
          LPWSTR szSID = NULL;
          ConvertSidToStringSid(pObjectSID, &szSID);
          result[std::to_string(x)] = Napi::String::New(env, (char16_t *)szSID);
          LocalFree(szSID);
        }
        return result;
      }
      if ((_wcsicmp(pCol->pszAttrName, L"objectGUID") == 0)) {
        result = Napi::Array::New(env);
        for (x = 0; x < pCol->dwNumValues; x++) {
          //  Cast to LPGUID.
          LPGUID pObjectGUID =
              (LPGUID)(pCol->pADsValues[x].OctetString.lpValue);
          //  Convert GUID to string.
          LPWSTR szDSGUID = new WCHAR[39];
          ::StringFromGUID2(*pObjectGUID, szDSGUID, 39);
          result[std::to_string(x)] =
              Napi::String::New(env, (char16_t *)szDSGUID);
        }
        return result;
      }
      return env.Undefined();
    case ADSTYPE_UTC_TIME:
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        ADS_UTC_TIME systemtime = pCol->pADsValues[x].UTCTime;
        DATE date;
        VARIANT varDate;
        if (SystemTimeToVariantTime(&systemtime, &date) == 0) {
          result[std::to_string(x)] =
              Napi::String::New(env, "<date not convertible>");
          continue;
        }
        //  Pack in variant.vt.
        varDate.vt = VT_DATE;
        varDate.date = date;
        VariantChangeType(&varDate, &varDate, VARIANT_NOVALUEPROP, VT_BSTR);
        result[std::to_string(x)] =
            Napi::String::New(env, (char16_t *)varDate.bstrVal);
        VariantClear(&varDate);
      }
      return result;
    case ADSTYPE_LARGE_INTEGER:
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        LARGE_INTEGER liValue = pCol->pADsValues[x].LargeInteger;
        FILETIME filetime;
        filetime.dwLowDateTime = liValue.LowPart;
        filetime.dwHighDateTime = liValue.HighPart;
        if ((filetime.dwHighDateTime == 0) && (filetime.dwLowDateTime == 0)) {
          result[std::to_string(x)] = Napi::String::New(env, "<No value set>");
          continue;
        }
        //  Verify properties of type LargeInteger that represent time.
        //  If TRUE, then convert to variant time.
        if ((0 != wcscmp(L"accountExpires", pCol->pszAttrName)) &&
            (0 != wcscmp(L"badPasswordTime", pCol->pszAttrName)) &&
            (0 != wcscmp(L"lastLogon", pCol->pszAttrName)) &&
            (0 != wcscmp(L"lastLogoff", pCol->pszAttrName)) &&
            (0 != wcscmp(L"lockoutTime", pCol->pszAttrName)) &&
            (0 != wcscmp(L"pwdLastSet", pCol->pszAttrName))) {
          std::string str =
              plf::string_format("high: %d low: %d", filetime.dwHighDateTime,
                                 filetime.dwLowDateTime);
          result[std::to_string(x)] = Napi::String::New(env, str);
          continue;
        }
        //  Handle special case for Never Expires where low part is -1.
        if (filetime.dwLowDateTime == -1) {
          result[std::to_string(x)] = Napi::String::New(env, "<Never Expires>");
          continue;
        }
        if (FileTimeToLocalFileTime(&filetime, &filetime) == 0) {
          result[std::to_string(x)] =
              Napi::String::New(env, "<FileTimeToLocalFileTime failed>");
          continue;
        }
        SYSTEMTIME systemtime;
        if (FileTimeToSystemTime(&filetime, &systemtime) == 0) {
          result[std::to_string(x)] =
              Napi::String::New(env, "<FileTimeToSystemTime failed>");
          continue;
        }
        DATE date;
        if (SystemTimeToVariantTime(&systemtime, &date) == 0) {
          result[std::to_string(x)] =
              Napi::String::New(env, "<FileTimeToVariantTime failed>");
          continue;
        }
        //  Pack in variant.vt.
        VARIANT varDate;
        varDate.vt = VT_DATE;
        varDate.date = date;
        VariantChangeType(&varDate, &varDate, VARIANT_NOVALUEPROP, VT_BSTR);
        result[std::to_string(x)] =
            Napi::String::New(env, (char16_t *)varDate.bstrVal);
        VariantClear(&varDate);
      }

      return result;
    case ADSTYPE_NT_SECURITY_DESCRIPTOR:
      result = Napi::Array::New(env);
      for (x = 0; x < pCol->dwNumValues; x++) {
        result[std::to_string(x)] =
            Napi::String::New(env, "<Security descriptor>");
      }
      return result;
    default:
      std::string str =
          plf::string_format("<Unknown type %d>", pCol->dwADsType);
      return Napi::String::New(env, str);
  }  // namespace myAddon
}  // namespace myAddon
}  // namespace myAddon