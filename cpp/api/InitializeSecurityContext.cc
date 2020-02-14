#include "../misc.h"

namespace myAddon {

Napi::Value e_InitializeSecurityContext(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "InitializeSecurityContext: Wrong number of arguments. "
        "InitializeSecurityContext({ credential: string, targetName: string, "
        "cbMaxToken?: number, "
        "contextHandle, "
        "serverSecurityContext?: Object })");
  }

  Napi::Object input = info[0].As<Napi::Object>();
  CredHandle cred = SecHandleUtil::deserialize(
      input.Get("credential").As<Napi::String>().Utf8Value());

  std::u16string wstr = input.Get("targetName").As<Napi::String>();
  LPWSTR packageName = (LPWSTR)wstr.c_str();

  unsigned int cbMaxToken = 48256;
  if (input.Has("cbMaxToken")) {
    cbMaxToken = input.Get("cbMaxToken").As<Napi::Number>().Uint32Value();
  }

  PSecBufferDesc pInput = NULL;
  if (input.Has("serverSecurityContext")) {
    Napi::Object serverSecurityContext =
        input.Get("serverSecurityContext").As<Napi::Object>();
    if (serverSecurityContext.Has("SecBufferDesc")) {
      Napi::Object secBufferDesc =
          serverSecurityContext.Get("SecBufferDesc").As<Napi::Object>();
      pInput = JS::initSecBufferDesc(secBufferDesc);
    }
  }

  TimeStamp tsExpiry;
  BYTE *buffer = (BYTE *)malloc(cbMaxToken * sizeof(BYTE));
  SecBuffer secBuffer;
  secBuffer.cbBuffer = cbMaxToken;
  secBuffer.BufferType = SECBUFFER_TOKEN;
  secBuffer.pvBuffer = buffer;

  SecBufferDesc fromClientSecBufferDesc;
  fromClientSecBufferDesc.ulVersion = 0;
  fromClientSecBufferDesc.cBuffers = 1;
  fromClientSecBufferDesc.pBuffers = &secBuffer;

  ULONG ulContextAttr;

  CtxtHandle clientContextHandle = {0, 0};
  bool isFirstCall = true;
  if (input.Has("contextHandle")) {
    isFirstCall = false;
    Napi::String clientContextHandleString =
        input.Get("contextHandle").As<Napi::String>();
    clientContextHandle =
        SecHandleUtil::deserialize(clientContextHandleString.Utf8Value());
  }

  if (input.HasOwnProperty("isFirstCall")) {
    isFirstCall = input.Get("isFirstCall").As<Napi::Boolean>().ToBoolean();
  }

  SECURITY_STATUS secStatus = InitializeSecurityContext(
      &cred, (isFirstCall) ? NULL : (&clientContextHandle), packageName,
      ISC_REQ_CONNECTION, RESERVED, SECURITY_NATIVE_DREP, pInput, RESERVED,
      &clientContextHandle, &fromClientSecBufferDesc, &ulContextAttr,
      &tsExpiry);

  Napi::Object result = Napi::Object::New(env);

  result["contextHandle"] =
      Napi::String::New(env, SecHandleUtil::serialize(clientContextHandle));

  switch (secStatus) {
    case SEC_I_CONTINUE_NEEDED:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, "SEC_I_CONTINUE_NEEDED");
      result["SecBufferDesc"] = JS::convert(env, &fromClientSecBufferDesc);
      break;
    case SEC_E_OK:
      result["SECURITY_STATUS"] = Napi::String::New(env, "SEC_E_OK");
      result["SecBufferDesc"] = JS::convert(env, &fromClientSecBufferDesc);
      break;

    default:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, std::to_string(secStatus));
  }

  // buffer was built with malloc so free it.
  free(buffer);

  if (secStatus < SEC_E_OK) {
    std::string message;
    switch (secStatus) {
      case SEC_E_INVALID_HANDLE:
        message =
            "Cannot InitializeSecurityContext: secStatus = "
            "SEC_E_INVALID_HANDLE";
        break;
      case SEC_E_INVALID_TOKEN:
        message =
            "Cannot InitializeSecurityContext: secStatus = SEC_E_INVALID_TOKEN";
        break;
      default:
        message = plf::string_format(
            "Cannot InitializeSecurityContext: secStatus = 0x%08x", secStatus);
    }
    throw Napi::Error::New(env, message);
  }

  return result;
}

}  // namespace myAddon
