#include "../../misc.h"
#include <fstream>

namespace myAddon {
	
void testImpersponation(HANDLE userToken) {
  STARTUPINFO si = { sizeof(STARTUPINFO) };
  PROCESS_INFORMATION pi = {0};

  wchar_t wszCommand[]=L"cmd.exe /C F:\\Apps\\ng\\angular-sso-example\\back\\testme.bat";
  /* Unicode version of CreateProcess modifies its command parameter... Ansi doesn't.
     Apparently this is not classed as a bug ???? */
  if(!CreateProcessAsUser(userToken,NULL,wszCommand,NULL,NULL,FALSE,CREATE_NEW_CONSOLE,NULL,NULL,&si,&pi))
  {
      //CloseHandle(hToken);
      fprintf(stderr,"CreateProcess returned error %d\n",GetLastError());
      return;
  }
  CloseHandle(pi.hProcess);
  CloseHandle(pi.hThread);	
    
	/*
    // Create and open a text file
    std::ofstream MyFile("SSPI.txt");

    // Write to the file
    MyFile << "Proof of concept as Kerberos SSPI impersonated user " << ;

    // Close the file
    MyFile.close();
	*/
}
	

void e_ImpersonateSecurityContext(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(
        env,
        "ImpersonateSecurityContext: Wrong number of arguments. "
        "ImpersonateSecurityContext(serverContextHandle: string)");
  }

  Napi::String serverContextHandleString = info[0].As<Napi::String>();
  CtxtHandle serverContextHandle =
      SecHandleUtil::deserialize(serverContextHandleString.Utf8Value());

  SECURITY_STATUS secStatus = ImpersonateSecurityContext(&serverContextHandle);
  if (secStatus != SEC_E_OK) {
    throw Napi::Error::New(env,
                           "Cannot ImpersonateSecurityContext: secStatus = " +
                               plf::error_msg(secStatus));
  }

  HANDLE userToken;

  DWORD flags = MAXIMUM_ALLOWED; // TOKEN_QUERY | TOKEN_QUERY_SOURCE;

  BOOL status = OpenThreadToken(GetCurrentThread(), flags, TRUE, &userToken);
  if (status == FALSE) {
      throw Napi::Error::New(env, "OpenThreadToken: error. " + plf::error_msg());
  }


  /* HANDLE duplicatedToken;
  BOOL statusDupl = DuplicateTokenEx(userToken, MAXIMUM_ALLOWED, NULL, SecurityImpersonation, TokenPrimary, &duplicatedToken);
  if (statusDupl == FALSE) {
      throw Napi::Error::New(env, "DuplicateTokenEx: error. " + plf::error_msg());
  } */
  


  if (!ImpersonateLoggedOnUser(userToken)) {
      throw Napi::Error::New(env, "C++ ImpersonateLoggedOnUser: error. " + plf::error_msg());
  }

  testImpersponation(userToken);

  
  // RevertToSelf();
  // CloseHandle(duplicatedToken);
}

}  // namespace myAddon
