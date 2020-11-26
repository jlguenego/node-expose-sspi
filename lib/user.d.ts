import {
  EwxFlag,
  PrivilegeAttributeFlag,
  ShutdownReasonFlag,
} from './flags/index';

/**
 * An AccessToken is a pointer to some user information.
 *
 * @type AccessToken
 */
export type AccessToken = string;

export interface Luid {
  LowPart: number;
  HighPart: number;
}

export interface TokenPrivileges {
  // TODO: privileges constant def.
  [privilege: string]: PrivilegeAttributeFlag[];
}

export interface WindowsUser {
  PrivilegeCheck(input: {
    accessToken: AccessToken;
    requireAll: boolean;
    requiredPrivileges: TokenPrivileges;
  }): boolean;

  AdjustTokenPrivileges(input: {
    accessToken: AccessToken;
    disableAllPrivileges: boolean;
    newState?: TokenPrivileges;
  }): void;

  LookupPrivilegeValue(input: {
    privilegeName: string;
    systemName?: string;
  }): Luid;

  ExitWindows(): void;

  ExitWindowsEx(input: { flag: EwxFlag; reason: ShutdownReasonFlag[] }): void;
}
