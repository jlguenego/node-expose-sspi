import { EwxFlag, ShutdownReasonFlag } from './flags/index';

export interface Luid {
  LowPart: number;
  HighPart: number;
}

export interface User {
  LookupPrivilegeValue(input: {
    privilegeName: string;
    systemName?: string;
  }): Luid;
  ExitWindows(): void;
  ExitWindowsEx(input: { flag: EwxFlag; reason: ShutdownReasonFlag[] }): void;
}
