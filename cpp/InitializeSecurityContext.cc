#include "misc.h"

namespace myAddon {



Napi::Value e_InitializeSecurityContext(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // get the credentials.
  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "InitializeSecurityContext: Wrong number of arguments. "
        "InitializeSecurityContext({ hCredential })");
  }

  Napi::Object input = info[0].As<Napi::Object>();
  Napi::Object credential = input.Get("credential").As<Napi::Object>();
  Credentials c;
  c.credHandle.dwLower =
      credential.Get("dwLower").As<Napi::Number>().Int64Value();
  c.credHandle.dwUpper =
      credential.Get("dwUpper").As<Napi::Number>().Int64Value();
  std::u16string ws = input.Get("targetName").As<Napi::String>();
  LPWSTR pszTargetName = (LPWSTR)ws.c_str();
  log("pszTargetName=%S", pszTargetName);
  log("ok3");

  TimeStamp tsExpiry;
  CredHandle cred = credMap[c.serialize()].credHandle;

  logHandle("credentials handle", &cred);

  CtxtHandle clientContext;

  BYTE buffer[cbMaxMessage];
  SecBuffer secBuffer;
  secBuffer.cbBuffer = cbMaxMessage;
  secBuffer.BufferType = SECBUFFER_TOKEN;
  secBuffer.pvBuffer = buffer;

  SecBufferDesc fromClientSecBufferDesc;
  fromClientSecBufferDesc.ulVersion = 0;
  fromClientSecBufferDesc.cBuffers = 1;
  fromClientSecBufferDesc.pBuffers = &secBuffer;

  ULONG ulContextAttr;

  // TimeStamp tsExpiry;

  SECURITY_STATUS secStatus = InitializeSecurityContext(
      &cred, NULL, pszTargetName, ISC_REQ_CONNECTION, RESERVED,
      SECURITY_NATIVE_DREP, NULL, RESERVED, &clientContext,
      &fromClientSecBufferDesc, &ulContextAttr, &tsExpiry);

  if (secStatus < SEC_E_OK) {
    std::string message;
    if (secStatus == SEC_E_INVALID_HANDLE) {
      message = "Cannot InitializeSecurityContext: invalid handle";
    } else {
      std::string str = "Cannot InitializeSecurityContext: secStatus = 0x%08x";
      message = plf::string_format(str, secStatus);
    }

    throw Napi::Error::New(env, message);
  }

  Napi::Object result = Napi::Object::New(env);

  switch (secStatus) {
    case SEC_I_CONTINUE_NEEDED:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, "SEC_I_CONTINUE_NEEDED");
      result["SecBufferDesc"] = JS::convert(env, &fromClientSecBufferDesc);
      break;
    default:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, std::to_string(secStatus));
  }

  return result;
}

}  // namespace myAddon
