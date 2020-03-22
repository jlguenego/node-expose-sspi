#include "flags.h"

#include <iostream>
#include <map>
#include <string>

#include <winsock.h>
#define SECURITY_WIN32
#include <Security.h>

#include <iads.h>

#define FLAG_INSERT(map, flag) map[flag] = #flag

#define flagmap std::map<int64_t, std::string>

flagmap extendedNameFormatMap;
flagmap accessTokenFlagsMap;
flagmap AscReqMap;
flagmap AscRetMap;
flagmap IscReqMap;
flagmap IscRetMap;
flagmap TargetDataRepMap;
flagmap CredentialUseMap;
flagmap AdsAuthenticationMap;

std::map<int64_t, flagmap *> contextMap;

namespace myAddon {

void initFlags() {
  contextMap[GETFLAG_EXTENDED_NAME_FORMAT] = &extendedNameFormatMap;
  contextMap[ACCESS_TOKEN_FLAGS] = &accessTokenFlagsMap;
  contextMap[ASC_REQ_FLAGS] = &AscReqMap;
  contextMap[ISC_REQ_FLAGS] = &IscReqMap;
  contextMap[ASC_RET_FLAGS] = &AscRetMap;
  contextMap[ISC_RET_FLAGS] = &IscRetMap;
  contextMap[SECURITY_DREP_FLAGS] = &TargetDataRepMap;
  contextMap[CREDENTIAL_USE_FLAG] = &CredentialUseMap;
  contextMap[ADS_AUTHENTICATION_FLAGS] = &AdsAuthenticationMap;

  FLAG_INSERT(extendedNameFormatMap, NameUnknown);
  FLAG_INSERT(extendedNameFormatMap, NameFullyQualifiedDN);
  FLAG_INSERT(extendedNameFormatMap, NameSamCompatible);
  FLAG_INSERT(extendedNameFormatMap, NameDisplay);
  FLAG_INSERT(extendedNameFormatMap, NameUniqueId);
  FLAG_INSERT(extendedNameFormatMap, NameCanonical);
  FLAG_INSERT(extendedNameFormatMap, NameUserPrincipal);
  FLAG_INSERT(extendedNameFormatMap, NameCanonicalEx);
  FLAG_INSERT(extendedNameFormatMap, NameServicePrincipal);
  FLAG_INSERT(extendedNameFormatMap, NameDnsDomain);
  FLAG_INSERT(extendedNameFormatMap, NameGivenName);
  FLAG_INSERT(extendedNameFormatMap, NameUnknown);
  FLAG_INSERT(extendedNameFormatMap, NameSurname);

  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_DEFAULT);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_GROUPS);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_PRIVILEGES);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ADJUST_SESSIONID);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ASSIGN_PRIMARY);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_DUPLICATE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_EXECUTE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_IMPERSONATE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_QUERY);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_QUERY_SOURCE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_READ);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_WRITE);
  FLAG_INSERT(accessTokenFlagsMap, TOKEN_ALL_ACCESS);

  FLAG_INSERT(AscReqMap, ASC_REQ_DELEGATE);
  FLAG_INSERT(AscReqMap, ASC_REQ_MUTUAL_AUTH);
  FLAG_INSERT(AscReqMap, ASC_REQ_REPLAY_DETECT);
  FLAG_INSERT(AscReqMap, ASC_REQ_SEQUENCE_DETECT);
  FLAG_INSERT(AscReqMap, ASC_REQ_CONFIDENTIALITY);
  FLAG_INSERT(AscReqMap, ASC_REQ_USE_SESSION_KEY);
  FLAG_INSERT(AscReqMap, ASC_REQ_SESSION_TICKET);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOCATE_MEMORY);
  FLAG_INSERT(AscReqMap, ASC_REQ_USE_DCE_STYLE);
  FLAG_INSERT(AscReqMap, ASC_REQ_DATAGRAM);
  FLAG_INSERT(AscReqMap, ASC_REQ_CONNECTION);
  FLAG_INSERT(AscReqMap, ASC_REQ_CALL_LEVEL);
  FLAG_INSERT(AscReqMap, ASC_REQ_FRAGMENT_SUPPLIED);
  FLAG_INSERT(AscReqMap, ASC_REQ_EXTENDED_ERROR);
  FLAG_INSERT(AscReqMap, ASC_REQ_STREAM);
  FLAG_INSERT(AscReqMap, ASC_REQ_INTEGRITY);
  FLAG_INSERT(AscReqMap, ASC_REQ_LICENSING);
  FLAG_INSERT(AscReqMap, ASC_REQ_IDENTIFY);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_NULL_SESSION);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_NON_USER_LOGONS);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_CONTEXT_REPLAY);
  FLAG_INSERT(AscReqMap, ASC_REQ_FRAGMENT_TO_FIT);
  FLAG_INSERT(AscReqMap, ASC_REQ_NO_TOKEN);
  FLAG_INSERT(AscReqMap, ASC_REQ_PROXY_BINDINGS);
  FLAG_INSERT(AscReqMap, ASC_REQ_ALLOW_MISSING_BINDINGS);
  FLAG_INSERT(AscReqMap, ASC_REQ_MESSAGES);

  FLAG_INSERT(IscReqMap, ISC_REQ_DELEGATE);
  FLAG_INSERT(IscReqMap, ISC_REQ_MUTUAL_AUTH);
  FLAG_INSERT(IscReqMap, ISC_REQ_REPLAY_DETECT);
  FLAG_INSERT(IscReqMap, ISC_REQ_SEQUENCE_DETECT);
  FLAG_INSERT(IscReqMap, ISC_REQ_CONFIDENTIALITY);
  FLAG_INSERT(IscReqMap, ISC_REQ_USE_SESSION_KEY);
  FLAG_INSERT(IscReqMap, ISC_REQ_PROMPT_FOR_CREDS);
  FLAG_INSERT(IscReqMap, ISC_REQ_USE_SUPPLIED_CREDS);
  FLAG_INSERT(IscReqMap, ISC_REQ_ALLOCATE_MEMORY);
  FLAG_INSERT(IscReqMap, ISC_REQ_USE_DCE_STYLE);
  FLAG_INSERT(IscReqMap, ISC_REQ_DATAGRAM);
  FLAG_INSERT(IscReqMap, ISC_REQ_CONNECTION);
  FLAG_INSERT(IscReqMap, ISC_REQ_CALL_LEVEL);
  FLAG_INSERT(IscReqMap, ISC_REQ_FRAGMENT_SUPPLIED);
  FLAG_INSERT(IscReqMap, ISC_REQ_EXTENDED_ERROR);
  FLAG_INSERT(IscReqMap, ISC_REQ_STREAM);
  FLAG_INSERT(IscReqMap, ISC_REQ_INTEGRITY);
  FLAG_INSERT(IscReqMap, ISC_REQ_IDENTIFY);
  FLAG_INSERT(IscReqMap, ISC_REQ_NULL_SESSION);
  FLAG_INSERT(IscReqMap, ISC_REQ_MANUAL_CRED_VALIDATION);
  FLAG_INSERT(IscReqMap, ISC_REQ_RESERVED1);
  FLAG_INSERT(IscReqMap, ISC_REQ_FRAGMENT_TO_FIT);
  FLAG_INSERT(IscReqMap, ISC_REQ_FORWARD_CREDENTIALS);
  FLAG_INSERT(IscReqMap, ISC_REQ_NO_INTEGRITY);
  FLAG_INSERT(IscReqMap, ISC_REQ_USE_HTTP_STYLE);
  FLAG_INSERT(IscReqMap, ISC_REQ_UNVERIFIED_TARGET_NAME);
  FLAG_INSERT(IscReqMap, ISC_REQ_CONFIDENTIALITY_ONLY);
  FLAG_INSERT(IscReqMap, ISC_REQ_MESSAGES);

  FLAG_INSERT(AscRetMap, ASC_RET_DELEGATE);
  FLAG_INSERT(AscRetMap, ASC_RET_MUTUAL_AUTH);
  FLAG_INSERT(AscRetMap, ASC_RET_REPLAY_DETECT);
  FLAG_INSERT(AscRetMap, ASC_RET_SEQUENCE_DETECT);
  FLAG_INSERT(AscRetMap, ASC_RET_CONFIDENTIALITY);
  FLAG_INSERT(AscRetMap, ASC_RET_USE_SESSION_KEY);
  FLAG_INSERT(AscRetMap, ASC_RET_SESSION_TICKET);
  FLAG_INSERT(AscRetMap, ASC_RET_ALLOCATED_MEMORY);
  FLAG_INSERT(AscRetMap, ASC_RET_USED_DCE_STYLE);
  FLAG_INSERT(AscRetMap, ASC_RET_DATAGRAM);
  FLAG_INSERT(AscRetMap, ASC_RET_CONNECTION);
  FLAG_INSERT(AscRetMap, ASC_RET_CALL_LEVEL);
  FLAG_INSERT(AscRetMap, ASC_RET_THIRD_LEG_FAILED);
  FLAG_INSERT(AscRetMap, ASC_RET_EXTENDED_ERROR);
  FLAG_INSERT(AscRetMap, ASC_RET_STREAM);
  FLAG_INSERT(AscRetMap, ASC_RET_INTEGRITY);
  FLAG_INSERT(AscRetMap, ASC_RET_LICENSING);
  FLAG_INSERT(AscRetMap, ASC_RET_IDENTIFY);
  FLAG_INSERT(AscRetMap, ASC_RET_NULL_SESSION);
  FLAG_INSERT(AscRetMap, ASC_RET_ALLOW_NON_USER_LOGONS);
  FLAG_INSERT(AscRetMap, ASC_RET_ALLOW_CONTEXT_REPLAY);
  FLAG_INSERT(AscRetMap, ASC_RET_FRAGMENT_ONLY);
  FLAG_INSERT(AscRetMap, ASC_RET_NO_TOKEN);
  FLAG_INSERT(AscRetMap, ASC_RET_NO_ADDITIONAL_TOKEN);
  FLAG_INSERT(AscRetMap, ASC_RET_MESSAGES);

  FLAG_INSERT(IscRetMap, ISC_RET_DELEGATE);
  FLAG_INSERT(IscRetMap, ISC_RET_MUTUAL_AUTH);
  FLAG_INSERT(IscRetMap, ISC_RET_REPLAY_DETECT);
  FLAG_INSERT(IscRetMap, ISC_RET_SEQUENCE_DETECT);
  FLAG_INSERT(IscRetMap, ISC_RET_CONFIDENTIALITY);
  FLAG_INSERT(IscRetMap, ISC_RET_USE_SESSION_KEY);
  FLAG_INSERT(IscRetMap, ISC_RET_USED_COLLECTED_CREDS);
  FLAG_INSERT(IscRetMap, ISC_RET_USED_SUPPLIED_CREDS);
  FLAG_INSERT(IscRetMap, ISC_RET_ALLOCATED_MEMORY);
  FLAG_INSERT(IscRetMap, ISC_RET_USED_DCE_STYLE);
  FLAG_INSERT(IscRetMap, ISC_RET_DATAGRAM);
  FLAG_INSERT(IscRetMap, ISC_RET_CONNECTION);
  FLAG_INSERT(IscRetMap, ISC_RET_INTERMEDIATE_RETURN);
  FLAG_INSERT(IscRetMap, ISC_RET_CALL_LEVEL);
  FLAG_INSERT(IscRetMap, ISC_RET_EXTENDED_ERROR);
  FLAG_INSERT(IscRetMap, ISC_RET_STREAM);
  FLAG_INSERT(IscRetMap, ISC_RET_INTEGRITY);
  FLAG_INSERT(IscRetMap, ISC_RET_IDENTIFY);
  FLAG_INSERT(IscRetMap, ISC_RET_NULL_SESSION);
  FLAG_INSERT(IscRetMap, ISC_RET_MANUAL_CRED_VALIDATION);
  FLAG_INSERT(IscRetMap, ISC_RET_RESERVED1);
  FLAG_INSERT(IscRetMap, ISC_RET_FRAGMENT_ONLY);
  FLAG_INSERT(IscRetMap, ISC_RET_FORWARD_CREDENTIALS);
  FLAG_INSERT(IscRetMap, ISC_RET_USED_HTTP_STYLE);
  FLAG_INSERT(IscRetMap, ISC_RET_REAUTHENTICATION);
  FLAG_INSERT(IscRetMap, ISC_RET_NO_ADDITIONAL_TOKEN);
  FLAG_INSERT(IscRetMap, ISC_RET_CONFIDENTIALITY_ONLY);
  FLAG_INSERT(IscRetMap, ISC_RET_MESSAGES);

  FLAG_INSERT(TargetDataRepMap, SECURITY_NATIVE_DREP);
  FLAG_INSERT(TargetDataRepMap, SECURITY_NETWORK_DREP);

  FLAG_INSERT(CredentialUseMap, SECPKG_CRED_INBOUND);
  FLAG_INSERT(CredentialUseMap, SECPKG_CRED_OUTBOUND);
  FLAG_INSERT(CredentialUseMap, SECPKG_CRED_BOTH);
  FLAG_INSERT(CredentialUseMap, SECPKG_CRED_DEFAULT);
  FLAG_INSERT(CredentialUseMap, SECPKG_CRED_RESERVED);

  FLAG_INSERT(AdsAuthenticationMap, ADS_SECURE_AUTHENTICATION);
  FLAG_INSERT(AdsAuthenticationMap, ADS_USE_ENCRYPTION);
  FLAG_INSERT(AdsAuthenticationMap, ADS_USE_SSL);
  FLAG_INSERT(AdsAuthenticationMap, ADS_READONLY_SERVER);
  FLAG_INSERT(AdsAuthenticationMap, ADS_PROMPT_CREDENTIALS);
  FLAG_INSERT(AdsAuthenticationMap, ADS_NO_AUTHENTICATION);
  FLAG_INSERT(AdsAuthenticationMap, ADS_FAST_BIND);
  FLAG_INSERT(AdsAuthenticationMap, ADS_USE_SIGNING);
  FLAG_INSERT(AdsAuthenticationMap, ADS_USE_SEALING);
  FLAG_INSERT(AdsAuthenticationMap, ADS_USE_DELEGATION);
  FLAG_INSERT(AdsAuthenticationMap, ADS_SERVER_BIND);
  FLAG_INSERT(AdsAuthenticationMap, ADS_NO_REFERRAL_CHASING);
  FLAG_INSERT(AdsAuthenticationMap, ADS_AUTH_RESERVED);

}

int64_t getFlagValue(Napi::Env env, int context, std::string str) {
  auto itr = contextMap.find(context);

  if (itr != contextMap.end()) {
    auto map = itr->second;

    for (auto it = map->begin(); it != map->end(); ++it) {
      if (it->second == str) {
        return it->first;
      }
    }
    throw Napi::Error::New(env, "Flag unknown: " + str);
  }
  throw Napi::Error::New(env, "context not found: " + context);
}

int64_t getFlags(Napi::Env env, int context, Napi::Object input,
                 std::string value, int64_t defaultFlags) {
  if (!input.Has(value)) {
    return defaultFlags;
  }
  Napi::Value val = input.Get(value);
  if (!val.IsArray()) {
    throw Napi::Error::New(env, value + " must be a flag string array.");
  }
  Napi::Array flagArray = val.As<Napi::Array>();
  DWORD flags = 0;
  for (uint32_t i = 0; i < flagArray.Length(); i++) {
    std::string flagStr = flagArray.Get(i).As<Napi::String>();
    DWORD flag = getFlagValue(env, context, flagStr);
    flags |= flag;
  }
  return flags;
}

int64_t getFlag(Napi::Env env, int context, Napi::Object input,
                std::string value, int64_t defaultFlags) {
  if (!input.Has(value)) {
    return defaultFlags;
  }
  Napi::Value val = input.Get(value);
  if (!val.IsString()) {
    throw Napi::Error::New(env, value + " must be a flag string.");
  }
  Napi::String string = val.As<Napi::String>();
  return getFlagValue(env, context, string);
}

Napi::Array setFlags(Napi::Env env, int context, int64_t flags) {
  auto it = contextMap.find(context);
  if (it == contextMap.end()) {
    throw Napi::Error::New(env, "context map not found.");
  }
  flagmap *map = contextMap[context];

  Napi::Array result = Napi::Array::New(env);
  int i = 0;

  for (auto it = map->begin(); it != map->end(); ++it) {
    int64_t f = it->first;
    if (flags & f) {
      result[std::to_string(i)] = Napi::String::New(env, it->second);
      i++;
    }
  }
  return result;
}

}  // namespace myAddon
