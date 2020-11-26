import { ComputerNameFormatFlag } from './flags';

export interface SysInfo {
  GetComputerNameEx(name: ComputerNameFormatFlag): string;
}
