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
  Napi::Object hCredential = input.Get("hCredential").As<Napi::Object>();
  std::u16string ws = input.Get("pszTargetName").As<Napi::String>();
  LPWSTR pszTargetName = (LPWSTR)ws.c_str();
  log("pszTargetName=%S", pszTargetName);

  // CredHandle cred;
  // cred.dwLower = hCredential.Get("dwLower").As<Napi::Number>().Uint32Value();
  // cred.dwUpper = hCredential.Get("dwUpper").As<Napi::Number>().Uint32Value();
  // logHandle("InitializeSecurityContext credentials: ", &cred);


  CredHandle cred;
  TimeStamp tsExpiry;

  SECURITY_STATUS secStatus =
      AcquireCredentialsHandle(NULL, (LPWSTR)L"Negotiate", SECPKG_CRED_BOTH, NULL,
                               NULL, NULL, NULL, &cred, &tsExpiry);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env, "Cannot FreeContextBuffer: secStatus = " +
                                    std::to_string(secStatus));
  }
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

  secStatus = InitializeSecurityContext(
      &cred, NULL, pszTargetName, ISC_REQ_CONNECTION, RESERVED,
      SECURITY_NATIVE_DREP, NULL, RESERVED, &clientContext,
      &fromClientSecBufferDesc, &ulContextAttr,
      &tsExpiry
  );

  if (secStatus < SEC_E_OK) {
    char buffer[BUFFER_SIZE];
    if (secStatus == SEC_E_INVALID_HANDLE) {
      snprintf(buffer, BUFFER_SIZE,
               "Cannot InitializeSecurityContext: invalid handle");
    } else {
      snprintf(buffer, BUFFER_SIZE,
               "Cannot InitializeSecurityContext: secStatus = 0x%08x",
               secStatus);
    }

    throw Napi::Error::New(env, buffer);
  }

  // if (secStatus != SEC_I_CONTINUE_NEEDED) {
  // 	error("InitializeSecurityContext did not returned
  // SEC_I_CONTINUE_NEEDED"); 	cleanup(); 	exit(1);
  // }
  // log("need to send to the server the output token.");

  // logHandle("clientContext handle", &clientContext);
  // logSecBufferDesc("client token #1", &fromClientSecBufferDesc);

  Napi::Object result = Napi::Object::New(env);
  result["SECURITY_STATUS"] = Napi::String::New(env, "SEC_I_CONTINUE_NEEDED");

  return result;
}

}  // namespace myAddon
