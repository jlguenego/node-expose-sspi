import { adsi } from '..';
import { IDirectorySearch, ColumnVal, LDAPObject } from '../../lib/adsi';

export interface SPNRecord {
  username: string;
  spn: string[];
}

export class SPN {
  constructor() {}

  async getListAll(): Promise<SPNRecord[]> {
    adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
    const root = await adsi.ADsGestObject('LDAP://rootDSE');
    const distinguishedName = await root.Get('defaultNamingContext');
    const dirsearch = await adsi.ADsOpenObject<IDirectorySearch>({
      binding: `LDAP://${distinguishedName}`,
      riid: 'IID_IDirectorySearch',
    });
    dirsearch.SetSearchPreference();
    dirsearch.ExecuteSearch({
      filter:
        '(&(objectClass=user)(objectCategory=person)(servicePrincipalName=*)(!(cn=krbtgt)))',
    });

    const users: LDAPObject[] = [];

    let hr = dirsearch.GetFirstRow();
    if (hr === adsi.S_ADS_NOMORE_ROWS) {
      throw new Error('GetFirstRow: no more rows');
    }
    const firstRow: { [colName: string]: ColumnVal } = {};

    let colName = dirsearch.GetNextColumnName();
    while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
      const value = await dirsearch.GetColumn(colName as string);
      firstRow[colName] = value;
      colName = dirsearch.GetNextColumnName();
    }
    users.push(firstRow);

    while (true) {
      const row: { [colName: string]: ColumnVal } = {};
      hr = dirsearch.GetNextRow();
      if (hr === adsi.S_ADS_NOMORE_ROWS) {
        break;
      }
      colName = dirsearch.GetNextColumnName();
      while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
        const value = await dirsearch.GetColumn(colName as string);
        row[colName] = value;
        colName = dirsearch.GetNextColumnName();
      }
      users.push(row);
    }
    dirsearch.Release();
    adsi.CoUninitialize();
    return users.map((user) => ({
      username: user.sAMAccountName[0] as string,
      spn: user.servicePrincipalName as string[],
    }));
  }

  async add(): Promise<void> {}
}
