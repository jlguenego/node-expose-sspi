export * from './sspi';
export * from './netapi';
export * from './flags';
export * from './user';
import { Sspi } from './sspi';
import { Adsi } from './adsi';
import { SysInfo } from './sysinfo';
import { WindowsUser } from './user';
import { NetApi } from './netapi';

export const sspi: Sspi;
export const adsi: Adsi;
export const sysinfo: SysInfo;
export const user: WindowsUser;
export const netapi: NetApi;
