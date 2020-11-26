import { user } from '../../dist';

console.log('about to logoff in 2s');
setTimeout(() => {
  user.ExitWindowsEx({
    flag: 'EWX_REBOOT',
    reason: ['SHTDN_REASON_FLAG_PLANNED', 'SHTDN_REASON_MINOR_HUNG'],
  });
}, 2000);
