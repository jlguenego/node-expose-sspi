// this script restarts windows.

const { user, sspi } = require('node-expose-sspi');

// add shutdown privileges.
const accessToken = sspi.OpenProcessToken(['TOKEN_ALL_ACCESS']);

user.AdjustTokenPrivileges({
  accessToken,
  disableAllPrivileges: false,
  newState: {
    SeShutdownPrivilege: ['SE_PRIVILEGE_ENABLED'],
  },
});

const ownerPrivileges = sspi.GetTokenInformation({
  accessToken: accessToken,
  tokenInformationClass: 'TokenPrivileges',
});
console.log('ownerPrivileges: ', ownerPrivileges);

// To let us see the logs before restarting
console.log('about to restart in 2s');
setTimeout(() => {
  user.ExitWindowsEx({
    flag: 'EWX_REBOOT',
    reason: ['SHTDN_REASON_FLAG_PLANNED', 'SHTDN_REASON_MINOR_HUNG'],
  });
}, 2000);
