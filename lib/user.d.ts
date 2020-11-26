import { EwxFlag, ShutdownReasonFlag } from './flags/index';

export interface User {
  ExitWindows(): void;
  ExitWindowsEx(input: { flag: EwxFlag; reason: ShutdownReasonFlag[] }): void;
}
