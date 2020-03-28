import { CoInitFlag } from './flags/CoInitFlag';

export interface IID {
  Release(): void;
}

export interface IADs extends IID {
  Get(name: string): string;
}
export interface IADsContainer extends IID {}
export interface IDispatch extends IID {}
export interface IDirectorySearch extends IID {
  SetSearchPreference(): void;
  ExecuteSearch(input: { filter: string }): void;
  GetNextRow(): HRESULT;
  GetNextColumnName(): string | HRESULT;
  GetColumn(colName: string): (string | number | boolean | undefined)[];
  
}

export type RiidFlag =
  | 'IID_IADs'
  | 'IID_IADsContainer'
  | 'IID_IDirectorySearch';

export type HRESULT = number;

export interface Adsi {
  CoInitialize(): void;
  CoInitializeEx(flags: CoInitFlag[]): void;
  CoUninitialize(): void;
  ADsGestObject(bindingUri: string): Promise<IADs>;
  ADsOpenObject<T extends IID>(input: {
    binding: string;
    riid: RiidFlag;
  }): Promise<T>;
  ADsOpenObjectSync<T extends IID>(input: {
    binding: string;
    riid: RiidFlag;
  }): T;
  S_ADS_NOMORE_ROWS: HRESULT;
  S_ADS_NOMORE_COLUMNS: HRESULT;
}
