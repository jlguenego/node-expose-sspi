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
  static PSecBufferDesc pOutput = NULL;
  if (pOutput == NULL) {
    pOutput = JS::initSecBufferDesc();
  }

  static CtxtHandle serverContextHandle;
  static bool isFirstCall = true;

  ULONG ulServerContextAttr;
  TimeStamp tsExpiry;
  SECURITY_STATUS secStatus = AcceptSecurityContext(
      &cred, isFirstCall ? NULL : &serverContextHandle, pInput,
      ASC_REQ_CONNECTION, SECURITY_NATIVE_DREP, &serverContextHandle, pOutput,
      &ulServerContextAttr, &tsExpiry);

  Napi::Object result = Napi::Object::New(env);

  log("e_AcceptSecurityContext completed.");

  switch (secStatus) {
    case SEC_I_CONTINUE_NEEDED:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, "SEC_I_CONTINUE_NEEDED");
      result["SecBufferDesc"] = JS::convert(env, pOutput);
      break;
    case SEC_E_INVALID_TOKEN:
      result["SECURITY_STATUS"] = Napi::String::New(env, "SEC_E_INVALID_TOKEN");
      break;
    default:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, plf::string_format("0x%08x", secStatus));
  }
  FreeContextBuffer(pInput);
  FreeContextBuffer(pOutput);
  if (secStatus < 0) {
    throw Napi::Error::New(
        env, "AcceptSecurityContext: SECURITY_STATUS incorrect (<0).");
  }
  return result;
}

}  // namespace myAddon
