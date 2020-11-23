import { user } from '../../dist';

console.log('about to logoff in 2s');
setTimeout(() => {
  user.ExitWindows();
}, 2000);
