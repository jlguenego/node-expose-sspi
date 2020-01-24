#include "misc.h"

namespace myAddon {

Napi::Value e_AcceptSecurityContext(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // get the credentials.
  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "AcceptSecurityContext: Wrong number of arguments. "
        "AcceptSecurityContext({ credential, clientSecurityContext })");
  }

  // {
  //   credential,
  //   clientSecurityContext
  // }
  Napi::Object input = info[0].As<Napi::Object>();
  Napi::Object credential = input.Get("credential").As<Napi::Object>();
  Napi::Object clientSecurityContext =
      input.Get("clientSecurityContext").As<Napi::Object>();

  Credentials c = JS::initCredentials(credential);
  CredHandle cred = credMap[c.serialize()].credHandle;
  logHandle("credentials handle", &cred);

  PSecBufferDesc pInput = JS::initSecBufferDesc(
      clientSecurityContext.Get("SecBufferDesc").As<Napi::Object>());

  static BYTE buffer[cbMaxMessage];  // need to use the same to complete the
                                     // buffer at the second call.
  SecBuffer secBuffer;
  secBuffer.cbBuffer = cbMaxMessage;
  secBuffer.BufferType = SECBUFFER_TOKEN;
  secBuffer.pvBuffer = buffer;

  SecBufferDesc fromServerSecBufferDesc;
  fromServerSecBufferDesc.ulVersion = 0;
  fromServerSecBufferDesc.cBuffers = 1;
  fromServerSecBufferDesc.pBuffers = &secBuffer;

  static CtxtHandle serverContextHandle;
  static bool isFirstCall = true;

  ULONG ulServerContextAttr;
  TimeStamp tsExpiry;
  SECURITY_STATUS secStatus = AcceptSecurityContext(
      &cred, isFirstCall ? NULL : &serverContextHandle, pInput,
      ASC_REQ_CONNECTION, SECURITY_NATIVE_DREP, &serverContextHandle,
      &fromServerSecBufferDesc, &ulServerContextAttr, &tsExpiry);

  Napi::Object result = Napi::Object::New(env);

  switch (secStatus) {
    case SEC_I_CONTINUE_NEEDED:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, "SEC_I_CONTINUE_NEEDED");
      break;
    case SEC_E_OK:
      result["SECURITY_STATUS"] = Napi::String::New(env, "SEC_E_OK");

      break;
    default:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, plf::string_format("0x%08x", secStatus));
  }
  std::string secStatusStr = plf::string_format("0x%08x", secStatus);
  if (secStatus < 0) {
    switch (secStatus) {
      case SEC_E_INVALID_TOKEN:
        secStatusStr = "SEC_E_INVALID_TOKEN";
        break;
    }
    throw Napi::Error::New(
        env, plf::string_format(
                 "AcceptSecurityContext: SECURITY_STATUS incorrect (<0): %s",
                 secStatusStr.c_str()));
  }
  log("e_AcceptSecurityContext completed.");
  result["SecBufferDesc"] = JS::convert(env, &fromServerSecBufferDesc);
  isFirstCall = false;

  return result;
}

}  // namespace myAddon
