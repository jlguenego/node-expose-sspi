import { sspi, user } from '../..';

const ownerToken = sspi.OpenProcessToken(['TOKEN_ALL_ACCESS']);
console.log('ownerToken: ', ownerToken);

const ownerPrivileges = sspi.GetTokenInformation({
  accessToken: ownerToken,
  tokenInformationClass: 'TokenPrivileges',
});
console.log('ownerPrivileges: ', ownerPrivileges);

const canShutdown = user.PrivilegeCheck({
  accessToken: ownerToken,
  requireAll: true,
  requiredPrivileges: {
    SeShutdownPrivilege: ['SE_PRIVILEGE_ENABLED'],
  },
});

console.log('canShutdown: ', canShutdown);

user.AdjustTokenPrivileges({
  accessToken: ownerToken,
  disableAllPrivileges: false,
  newState: {
    SeShutdownPrivilege: ['SE_PRIVILEGE_ENABLED'],
  },
});

const canShutdown2 = user.PrivilegeCheck({
  accessToken: ownerToken,
  requireAll: true,
  requiredPrivileges: {
    SeShutdownPrivilege: ['SE_PRIVILEGE_ENABLED'],
  },
});
console.log('canShutdown2: ', canShutdown2);

const luid = user.LookupPrivilegeValue({
  privilegeName: 'SeChangeNotifyPrivilege',
});
console.log('luid: ', luid);
