import { adsi, sspi, sso } from '../src';
import a from 'assert';
import { IADsContainer, IDirectorySearch, ColumnVal } from '../lib/adsi';
import dbg from 'debug';

const debug = dbg('node-expose-sspi:test');

const assert = a.strict;

describe('ADSI Unit Test', function () {
  it('should test CoInitialize and CoUninitialize', function () {
    adsi.CoInitialize();
    adsi.CoUninitialize();
  });

  it('can CoInitialize many times', async function () {
    this.timeout(8000);
    adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
    adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
    adsi.CoUninitialize();
    adsi.CoUninitialize();
    await sso.sleep(5000);
  });

  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should test CoInitializeEx', function () {
      adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
    });

    it('should test ADsOpenObject with global catalog', async function () {
      try {
        const gc = await adsi.ADsOpenObject<IADsContainer>({
          binding: 'GC:',
          riid: 'IID_IADsContainer',
        });
        if (gc === undefined) {
          throw new Error('Domain controller not reachable');
        }
        const element = gc.Next();
        const ds = element.QueryInterface('IID_IDirectorySearch');
        element.Release();
        ds.Release();
        gc.Release();
      } catch (e) {
        assert(false);
      }
    });

    let distinguishedName: string;
    it('should get the Root Distinguished Name (LDAP notion) for the domain', async function () {
      const root = await adsi.ADsGestObject('LDAP://rootDSE');
      distinguishedName = await root.Get('defaultNamingContext');
      assert(distinguishedName);
      assert(distinguishedName.startsWith('DC='));
    });

    it('should get all users that have a defined surname', async function () {
      this.timeout(15000);
      const dirsearch = await adsi.ADsOpenObject<IDirectorySearch>({
        binding: `LDAP://${distinguishedName}`,
        riid: 'IID_IDirectorySearch',
      });
      dirsearch.SetSearchPreference();
      dirsearch.ExecuteSearch({
        filter: '(&(objectClass=user)(objectCategory=person)(sn=*))',
      });
      const result = [];
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
      result.push(firstRow);

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
        result.push(row);
      }
      dirsearch.Release();
    });

    let fullName: string;
    it('should test ADsGestObject with WinNT provider', async function () {
      const username = sspi.GetUserName();
      const myself = await adsi.ADsGestObject(
        `WinNT://jlg.local/${username},user`
      );
      fullName = await myself.Get('FullName');
      assert(fullName);
      const objectGUID = myself.get_GUID();
      assert(objectGUID);
      assert(objectGUID.length === 38);
    });

    let guid: string;
    it('should test AdsGestObject with LDAP provider', async function () {
      debug('distinguishedName: ', distinguishedName);
      debug('fullName: ', fullName);
      const iads = await adsi.ADsGestObject(
        `LDAP://CN=${fullName},OU=JLG_LOCAL,${distinguishedName}`
      );
      const str = iads.get_Name();
      assert(str, 'string is falsy');
      assert(str === 'CN=' + fullName, 'string does not start with CN=' + fullName);
      iads.GetInfoEx();
      iads.GetInfoEx('sn');
      const sn = await iads.Get('sn');
      assert(sn);
      assert(typeof sn === 'string');
      assert(str.includes(sn));
      const givenName = await iads.Get('givenName');
      assert(str.includes(givenName));
      guid = iads.get_GUID();
      assert(guid.length === 32);
      iads.Release();
    });

    it('should test ADsGestObject with GUID', async function () {
      const myself2 = await adsi.ADsGestObject(
        `LDAP://jlg.local/<GUID=${guid}>`
      );
      const cname = myself2.get_Name();
      assert(cname === 'CN=' + fullName);
      myself2.Release();
    });

    it('should test CoUninitialize', function () {
      adsi.CoUninitialize();
    });
  }
});
