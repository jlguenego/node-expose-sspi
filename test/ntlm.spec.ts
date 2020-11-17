import assert from 'assert';
import { negotiateParse } from '../src/sso/msgParser';

describe('NTLM Message Unit Test', function () {
  it('should parse NTLM type 1 message', function () {
    const base64 = 'TlRMTVNTUAABAAAAB4IIogAAAAAAAAAAAAAAAAAAAAAKALpHAAAADw==';
    const props = negotiateParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NTLM Type 1',
      flags: 'UNICODE OEM REQUEST_TARGET NTLM ALWAYS_SIGN NEG_28 NEG_56',
      suppliedDomain: { length: 0, allocated: 0, offset: 0 },
      suppliedWorkstation: { length: 0, allocated: 0, offset: 0 },
      osVersionStructure: {
        majorVersion: 10,
        minorVersion: 0,
        buildNumber: 18362,
        unknown: 15,
      },
      suppliedDomainData: '',
      suppliedWorkstationData: '',
    });
  });
  it('should NTLMT1_hex', function () {
    const hex =
      '4e544c4d53535000010000000732000006000600330000000b000b0028000000050093080000000f574f524b53544154494f4e444f4d41494e';
    const base64 = Buffer.from(hex, 'hex').toString('base64');
    const props = negotiateParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NTLM Type 1',
      flags:
        'UNICODE OEM REQUEST_TARGET NTLM DOMAIN_SUPPLIED WORKSTATION_SUPPLIED',
      suppliedDomain: {
        allocated: 6,
        length: 6,
        offset: 51,
      },
      suppliedWorkstation: {
        allocated: 11,
        length: 11,
        offset: 40,
      },
      osVersionStructure: {
        majorVersion: 5,
        minorVersion: 0,
        buildNumber: 2195,
        unknown: 0x0000000f,
      },
      suppliedDomainData: 'DOMAIN',
      suppliedWorkstationData: 'WORKSTATION',
    });
  });

  it('should NTLMT2_hex', function () {
    const hex =
      '4e544c4d53535000020000000c000c003000000001028100' +
      '0123456789abcdef0000000000000000620062003c000000' +
      '44004f004d00410049004e0002000c0044004f004d004100' +
      '49004e0001000c0053004500520056004500520004001400' +
      '64006f006d00610069006e002e0063006f006d0003002200' +
      '7300650072007600650072002e0064006f006d0061006900' +
      '6e002e0063006f006d0000000000';
    const base64 = Buffer.from(hex, 'hex').toString('base64');
    const props = negotiateParse(base64);
    assert.deepStrictEqual(props, {
      messageType: 'NTLM Type 2',
      flags:
        'UNICODE OEM REQUEST_TARGET NTLM DOMAIN_SUPPLIED WORKSTATION_SUPPLIED',
    });
  });
});
