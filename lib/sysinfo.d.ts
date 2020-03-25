import { ComputerNameFormatFlag } from "./flags/ComputerNameFormatFlag";

export interface SysInfo {
    GetComputerNameEx(name: ComputerNameFormatFlag): string;
}

