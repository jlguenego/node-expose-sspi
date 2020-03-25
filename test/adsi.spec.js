const { adsi, sspi } = require('node-expose-sspi');
const assert = require('assert').strict;

describe('ADSI Unit Test', function() {
  it('should test CoInitialize and CoUninitialize', function() {
    sspi.CoInitialize();
    sspi.CoUninitialize();
  });

  it('should test CoInitializeEx', function() {
    sspi.CoInitializeEx(['COINIT_MULTITHREADED']);
  });

  it('should test ADsOpenObject with global catalog', async function() {
    const gc = await sspi.ADsOpenObject({
      binding: 'GC:',
      riid: 'IID_IADsContainer',
    });
    if (gc === undefined) {
      throw new Error('Domain controller not reachable');
    }
    assert(gc instanceof sspi.IADsContainer);
    const element = gc.Next();
    assert(element instanceof sspi.IDispatch);
    const ds = element.QueryInterface('IID_IDirectorySearch');
    assert(ds instanceof sspi.IDirectorySearch);
    element.Release();
    ds.Release();
    gc.Release();
  });

  let distinguishedName;
  it('should get the Root Distinguished Name (LDAP notion) for the domain', async function() {
    const root = await sspi.ADsGestObject('LDAP://rootDSE');
    assert(root instanceof sspi.IADs);
    distinguishedName = await root.Get('defaultNamingContext');
    assert(distinguishedName);
    assert(distinguishedName.startsWith('DC='));
  });

  it('should get all users that have a defined surname', async function() {
    this.timeout(15000);
    const dirsearch = await sspi.ADsOpenObject({
      binding: `LDAP://${distinguishedName}`,
      riid: 'IID_IDirectorySearch',
    });
    assert(dirsearch instanceof sspi.IDirectorySearch);
    dirsearch.SetSearchPreference();
    dirsearch.ExecuteSearch({
      filter: '(&(objectClass=user)(objectCategory=person)(sn=*))',
    });
    const result = [];
    let hr = dirsearch.GetFirstRow();
    if (hr === adsi.S_ADS_NOMORE_ROWS) {
      throw new Error('GetFirstRow: no more rows');
    }
    const firstRow = {};

    let colName = dirsearch.GetNextColumnName();
    while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
      const value = await dirsearch.GetColumn(colName);
      firstRow[colName] = value;
      colName = dirsearch.GetNextColumnName();
    }
    result.push(firstRow);

    while (true) {
      const row = {};
      hr = dirsearch.GetNextRow();
      if (hr === adsi.S_ADS_NOMORE_ROWS) {
        break;
      }
      let colName = dirsearch.GetNextColumnName();
      while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
        const value = await dirsearch.GetColumn(colName);
        row[colName] = value;
        colName = dirsearch.GetNextColumnName();
      }
      result.push(row);
    }
    dirsearch.Release();
  });

  let fullName;
  it('should test ADsGestObject with WinNT provider', async function() {
    const username = sspi.GetUserName();
    const myself = await sspi.ADsGestObject(
      `WinNT://jlg.local/${username},user`
    );
    fullName = await myself.Get('FullName');
    assert(fullName);
    const objectGUID = myself.get_GUID();
    assert(objectGUID);
    assert(objectGUID.length === 38);
  });

  let guid;
  it('should test AdsGestObject with LDAP provider', async function() {
    const iads = await sspi.ADsGestObject(
      `LDAP://CN=${fullName},OU=JLG_LOCAL,${distinguishedName}`
    );
    assert(iads instanceof sspi.IADs);
    const str = iads.get_Name();
    assert(str);
    assert(str === 'CN=' + fullName);
    iads.GetInfoEx();
    iads.GetInfoEx('sn');
    const sn = await iads.Get('sn');
    assert(sn);
    assert(typeof sn === 'string');
    assert(str.indexOf(sn) !== -1);
    const givenName = await iads.Get('givenName');
    assert(str.indexOf(givenName) !== -1);
    guid = iads.get_GUID();
    assert(guid.length === 32);
    iads.Release();
  });

  it('should test ADsGestObject with GUID', async function() {
    const myself2 = await sspi.ADsGestObject(`LDAP://jlg.local/<GUID=${guid}>`);
    const cname = myself2.get_Name();
    assert(cname === 'CN=' + fullName);
    myself2.Release();
  });

  it('should test CoUninitialize', function() {
    sspi.CoUninitialize();
  });
});


//   const str = sspi.GetComputerNameEx('ComputerNameDnsDomain');
//   console.log('str: ', str);
// }


