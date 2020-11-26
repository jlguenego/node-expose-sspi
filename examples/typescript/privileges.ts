import { sspi, user } from '../..';

const ownerToken = sspi.OpenProcessToken(['TOKEN_ALL_ACCESS']);
console.log('ownerToken: ', ownerToken);

const ownerPrivileges = sspi.GetTokenInformation({
  accessToken: ownerToken,
  tokenInformationClass: 'TokenPrivileges',
});
console.log('ownerPrivileges: ', ownerPrivileges);

const luid = user.LookupPrivilegeValue({
  privilegeName: 'SeChangeNotifyPrivilege',
});
console.log('luid: ', luid);
