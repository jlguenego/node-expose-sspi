export * from './sspi';
export * from './netapi';
export * from './flags';
import { Sspi } from './sspi';
import { Adsi } from './adsi';
import { SysInfo } from './sysinfo';
import { NetApi } from './netapi';

export const sspi: Sspi;
export const adsi: Adsi;
export const sysinfo: SysInfo;
export const netapi: NetApi;
