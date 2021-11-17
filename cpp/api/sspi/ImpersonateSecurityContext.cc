#include "../../misc.h"
#include <fstream>

namespace myAddon {

// Proof of concept as Kerberos SSPI impersonated user 	
void testImpersponation(HANDLE userToken) {
	
  // Create and open a text file
  std::ofstream MyFile("test_SSPI.bat");

  // Write to the file
  MyFile << "whoami > whoami.txt"; 

  // Close the file
  MyFile.close(); // check if file owner is the impersonated user
	
  STARTUPINFO si = { sizeof(STARTUPINFO) };
  PROCESS_INFORMATION pi = {0};

  wchar_t wszCommand[]=L"cmd.exe /C test_SSPI.bat";
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


  HANDLE duplicatedToken;
  BOOL statusDupl = DuplicateTokenEx(userToken, MAXIMUM_ALLOWED, NULL, SecurityImpersonation, TokenPrimary, &duplicatedToken);
  if (statusDupl == FALSE) {
      throw Napi::Error::New(env, "DuplicateTokenEx: error. " + plf::error_msg());
  }
  


  if (!ImpersonateLoggedOnUser(duplicatedToken)) {
      throw Napi::Error::New(env, "C++ ImpersonateLoggedOnUser: error. " + plf::error_msg());
  }

  testImpersponation(duplicatedToken);

  
  // RevertToSelf();
  CloseHandle(duplicatedToken);
}

}  // namespace myAddon
