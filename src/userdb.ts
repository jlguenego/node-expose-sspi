import { adsi } from '../lib/api';
import { IDirectorySearch, IADs } from '../lib/adsi';
import { isOnDomain } from './domain';
import dbg from 'debug';
import { Database, ADUser, ADUsers } from './interfaces';

const debug = dbg('node-expose-sspi:userdb');

export const database: Database = {
  users: [],
};

/**
 * 
 * This function is recommanded to be called before starting a server.
 * 
 * Purpose is to cache all Active Directory (AD) users for
 * performance during authentication, just for increasing performance.
 * 
 * Useless if you do not use AD.
 *
 * @export
 * @returns {Promise<void>}
 */
export async function init(): Promise<void> {
  if (!isOnDomain()) {
    return;
  }
  try {
    debug('init');
    // request all accounts from domain
    database.users = await getUsers();
  } catch (e) {
    debug('Cannot get users from AD. e: ', e);
  }
}

export async function getUser(ldapFilter: string): Promise<ADUser> {
  if (!isOnDomain()) {
    return;
  }
  adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
  let dirsearch: IDirectorySearch;
  try {
    const distinguishedName = await getDistinguishedName();
    dirsearch = await adsi.ADsOpenObject<IDirectorySearch>({
      binding: `LDAP://${distinguishedName}`,
      riid: 'IID_IDirectorySearch',
    });
    dirsearch.SetSearchPreference();
    dirsearch.ExecuteSearch({
      filter: `(&(objectClass=user)(objectCategory=person)${ldapFilter})`,
    });

    const hr = dirsearch.GetNextRow();
    if (hr === adsi.S_ADS_NOMORE_ROWS) {
      return undefined;
    }
    const row: ADUser = {};
    let colName = dirsearch.GetNextColumnName();
    while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
      const value = await dirsearch.GetColumn(colName as string);
      row[colName] = value;
      colName = dirsearch.GetNextColumnName();
    }
    return row;
  } finally {
    dirsearch && dirsearch.Release();
    adsi.CoUninitialize();
  }
}

export async function getUsers(): Promise<ADUsers> {
  if (!isOnDomain()) {
    return;
  }
  const result: ADUsers = [];
  adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
  let dirsearch;
  try {
    const distinguishedName = await getDistinguishedName();
    dirsearch = await adsi.ADsOpenObject<IDirectorySearch>({
      binding: `LDAP://${distinguishedName}`,
      riid: 'IID_IDirectorySearch',
    });
    dirsearch.SetSearchPreference();
    dirsearch.ExecuteSearch({
      filter: '(&(objectClass=user)(objectCategory=person)(sn=*))',
    });

    while (true) {
      if (dirsearch.GetNextRow() === adsi.S_ADS_NOMORE_ROWS) {
        break;
      }
      const row: ADUser = {};
      let colName = dirsearch.GetNextColumnName();
      while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
        const value = await dirsearch.GetColumn(colName as string);
        row[colName] = value;
        colName = dirsearch.GetNextColumnName();
      }
      result.push(row);
    }
  } catch (error) {
    console.log('error: ', error);
  } finally {
    dirsearch && dirsearch.Release();
    adsi.CoUninitialize();
  }
  return result;
}

export async function getDistinguishedName(): Promise<string> {
  if (!isOnDomain()) {
    return;
  }
  let root: IADs;
  try {
    root = await adsi.ADsGestObject('LDAP://rootDSE');
    const distinguishedName = await root.Get('defaultNamingContext');
    return distinguishedName;
  } finally {
    root && root.Release();
  }
}
