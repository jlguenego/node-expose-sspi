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

  PSecBufferDesc pInput = JS::initSecBufferDesc(clientSecurityContext);
  PSecBufferDesc pOutput = JS::initSecBufferDesc();

  static CtxtHandle serverContextHandle;
  ULONG ulServerContextAttr;
  TimeStamp tsExpiry;
  SECURITY_STATUS secStatus = AcceptSecurityContext(
      &cred, NULL, pInput, ASC_REQ_CONNECTION, SECURITY_NATIVE_DREP,
      &serverContextHandle, pOutput, &ulServerContextAttr, &tsExpiry);

  Napi::Object result = Napi::Object::New(env);

  log("e_AcceptSecurityContext completed.");
  return result;
}

}  // namespace myAddon
