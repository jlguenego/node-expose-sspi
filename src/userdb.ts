import { trace } from './misc';
import { adsi } from '../lib/api';
import { IDirectorySearch } from '../lib/adsi';
import { isOnDomain } from './domain';

interface Database {
  users: ADUsers;
}

export interface ADUser {
  sn?: string;
  givenName?: string;
  cn?: string;
  [key: string]: any;
}

type ADUsers = ADUser[];

export const database: Database = {
  users: [],
};

export async function init() {
  if (!isOnDomain()) {
    return;
  }
  try {
    trace('init');
    // request all accounts from domain
    database.users = await getUsers();
  } catch (e) {
    trace('Cannot get users from AD. e: ', e);
  }
}

export async function getUser(ldapFilter: string): Promise<ADUser> {
  if (!isOnDomain()) {
    return;
  }
  adsi.CoInitializeEx(['COINIT_MULTITHREADED']);

  const distinguishedName = await getDistinguishedName();
  const dirsearch = await adsi.ADsOpenObject<IDirectorySearch>({
    binding: `LDAP://${distinguishedName}`,
    riid: 'IID_IDirectorySearch',
  });
  dirsearch.SetSearchPreference();
  dirsearch.ExecuteSearch({
    filter: `(&(objectClass=user)(objectCategory=person)${ldapFilter})`,
  });

  let row: ADUser;
  const hr = dirsearch.GetNextRow();
  if (hr === adsi.S_ADS_NOMORE_ROWS) {
    dirsearch.Release();
    adsi.CoUninitialize();
    return undefined;
  }
  row = {};
  let colName = dirsearch.GetNextColumnName();
  while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
    const value = await dirsearch.GetColumn(colName as string);
    row[colName] = value;
    colName = dirsearch.GetNextColumnName();
  }

  dirsearch.Release();
  adsi.CoUninitialize();
  return row;
}

export async function getUsers(): Promise<ADUsers> {
  if (!isOnDomain()) {
    return;
  }
  adsi.CoInitializeEx(['COINIT_MULTITHREADED']);

  const distinguishedName = await getDistinguishedName();
  const dirsearch = await adsi.ADsOpenObject<IDirectorySearch>({
    binding: `LDAP://${distinguishedName}`,
    riid: 'IID_IDirectorySearch',
  });
  dirsearch.SetSearchPreference();
  dirsearch.ExecuteSearch({
    filter: '(&(objectClass=user)(objectCategory=person)(sn=*))',
  });

  const result: ADUsers = [];
  while (true) {
    const row: ADUser = {};
    const hr = dirsearch.GetNextRow();
    if (hr === adsi.S_ADS_NOMORE_ROWS) {
      break;
    }
    let colName = dirsearch.GetNextColumnName();
    while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
      const value = await dirsearch.GetColumn(colName as string);
      row[colName] = value;
      colName = dirsearch.GetNextColumnName();
    }
    result.push(row);
  }
  dirsearch.Release();
  adsi.CoUninitialize();
  return result;
}

export async function getDistinguishedName(): Promise<string> {
  if (!isOnDomain()) {
    return;
  }
  const root = await adsi.ADsGestObject('LDAP://rootDSE');
  const distinguishedName = root.Get('defaultNamingContext');
  return distinguishedName;
}
