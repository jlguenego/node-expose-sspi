#include "../../misc.h"

namespace myAddon {

Napi::Value e_AcceptSecurityContext(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "AcceptSecurityContext: Wrong number of arguments. "
        "AcceptSecurityContext({ credential, contextReq?: AscReqFlag[],"
        "clientSecurityContext, contextHandle })");
  }

  Napi::Object input = info[0].As<Napi::Object>();
  CredHandle cred = SecHandleUtil::deserialize(
      input.Get("credential").As<Napi::String>().Utf8Value());
  Napi::Object clientSecurityContext =
      input.Get("clientSecurityContext").As<Napi::Object>();

  PSecBufferDesc pInput = JS::initSecBufferDesc(
      clientSecurityContext.Get("SecBufferDesc").As<Napi::Object>());

  DWORD fContextReq =
      getFlags(env, ASC_REQ_FLAGS, input, "contextReq", ASC_REQ_CONNECTION);

  DWORD targetDataRep = getFlag(env, SECURITY_DREP_FLAGS, input,
                                "targetDataRep", SECURITY_NATIVE_DREP);

  BYTE buffer[cbMaxMessage];
  SecBuffer secBuffer;
  secBuffer.cbBuffer = cbMaxMessage;
  secBuffer.BufferType = SECBUFFER_TOKEN;
  secBuffer.pvBuffer = buffer;

  SecBufferDesc fromServerSecBufferDesc;
  fromServerSecBufferDesc.ulVersion = 0;
  fromServerSecBufferDesc.cBuffers = 1;
  fromServerSecBufferDesc.pBuffers = &secBuffer;

  CtxtHandle serverContextHandle = {0, 0};
  bool isFirstCall = true;
  if (input.Has("contextHandle") && input.Get("contextHandle").IsString()) {
    isFirstCall = false;
    Napi::String serverContextHandleString =
        input.Get("contextHandle").As<Napi::String>();
    serverContextHandle =
        SecHandleUtil::deserialize(serverContextHandleString.Utf8Value());
  }

  ULONG ulServerContextAttr;
  TimeStamp tsExpiry;
  SECURITY_STATUS secStatus = AcceptSecurityContext(
      &cred, isFirstCall ? NULL : &serverContextHandle, pInput, fContextReq,
      targetDataRep, &serverContextHandle, &fromServerSecBufferDesc,
      &ulServerContextAttr, &tsExpiry);

  Napi::Object result = Napi::Object::New(env);
  result["contextHandle"] =
      Napi::String::New(env, SecHandleUtil::serialize(serverContextHandle));
  result["contextAttr"] = setFlags(env, ASC_RET_FLAGS, ulServerContextAttr);

  switch (secStatus) {
    case SEC_I_CONTINUE_NEEDED:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, "SEC_I_CONTINUE_NEEDED");
      result["SecBufferDesc"] = JS::convert(env, &fromServerSecBufferDesc);
      break;
    case SEC_E_OK:
      result["SECURITY_STATUS"] = Napi::String::New(env, "SEC_E_OK");
      result["SecBufferDesc"] = JS::convert(env, &fromServerSecBufferDesc);
      break;
    case SEC_E_LOGON_DENIED:
      result["SECURITY_STATUS"] = Napi::String::New(env, "SEC_E_LOGON_DENIED");
      break;
    default:
      result["SECURITY_STATUS"] =
          Napi::String::New(env, plf::string_format("0x%08x", secStatus));
  }
  if (secStatus < 0 && secStatus != SEC_E_LOGON_DENIED) {
    throw Napi::Error::New(
        env, "AcceptSecurityContext: SECURITY_STATUS incorrect (<0): " +
                 plf::error_msg(secStatus));
  }

  return result;
}

}  // namespace myAddon
