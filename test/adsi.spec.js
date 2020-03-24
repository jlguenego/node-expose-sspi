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
    distinguishedName = root.Get('defaultNamingContext');
    assert(distinguishedName.startsWith('DC='));
  });

  it('should get all users that have a defined surname', async function() {
    this.timeout(15000); 
    const dirsearch = await sspi.ADsOpenObject({
      binding: `LDAP://${distinguishedName}`,
      riid: 'IID_IDirectorySearch',
    });
    console.log('dirsearch: ', dirsearch);
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

    while (true) {
      hr = dirsearch.GetNextRow();
      if (hr === adsi.S_ADS_NOMORE_ROWS) {
        break;
      }
      let colName = dirsearch.GetNextColumnName();
      while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
        console.log('colName: ', colName);
        const value = await dirsearch.GetColumn(colName);
        console.log('value: ', value);
        colName = dirsearch.GetNextColumnName();
      }
    }

    dirsearch.Release();
  });

  it('should test CoUninitialize', function() {
    sspi.CoUninitialize();
  });
});

//     // 2) Get info about my account
//     console.log('about to do sspi.ADsGestObject');
//     const myself = await sspi.ADsGestObject(
//       `WinNT://jlg.local/${username},user`
//     );
//     console.log('about to do myself.Get');
//     const fullName = myself.Get('FullName');
//     console.log('fullName: ', fullName);
//     const objectGUID = myself.get_GUID();
//     console.log('objectGUID: ', objectGUID);

//     console.log('about to do sspi.ADsGestObject LDAP');
//     const iads = await sspi.ADsGestObject(
//       `LDAP://CN=${fullName},OU=JLG_LOCAL,${distinguishedName}`
//     );
//     console.log('about to do iads.get_Name');
//     const str = iads.get_Name();
//     console.log('str: ', str);
//     console.log('about to do iads.GetInfoEx');
//     iads.GetInfoEx('sn');
//     console.log('about to do iads.Get');
//     const sn = iads.Get('sn');
//     console.log('sn: ', sn);
//     const givenName = iads.Get('givenName');
//     console.log('givenName: ', givenName);
//     const guid = iads.get_GUID();
//     console.log('guid: ', guid);
//     iads.Release();

//     const myself2 = await sspi.ADsGestObject(`LDAP://jlg.local/<GUID=${guid}>`);
//     console.log('about to do myself2.Get');
//     const cname = myself2.get_Name();
//     console.log('cname: ', cname);
//     myself2.Release();
//   } catch (error) {
//     console.log('error: ', error);
//   }

//   sspi.CoUninitialize();

//   const str = sspi.GetComputerNameEx('ComputerNameDnsDomain');
//   console.log('str: ', str);
// }

// testADSI();
