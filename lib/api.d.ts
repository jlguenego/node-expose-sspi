export * from './sspi';
export * from './flags';
import { Sspi } from './sspi';
import { Adsi } from './adsi';
import { SysInfo } from './sysinfo';

export const sspi: Sspi;
export const adsi: Adsi;
export const sysinfo: SysInfo;
