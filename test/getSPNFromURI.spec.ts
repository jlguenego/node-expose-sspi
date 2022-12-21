import { sso, sysinfo } from '../src';
import { strict as assert } from 'assert';

describe('getSPNFromURI Unit Test', function () {
  this.timeout(15000);
  const f = sso.getSPNFromURI;

  const msDomain = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
  if (msDomain === '') {
    // the Windows OS is not part of a Microsoft Domain.
    return;
  }

  it('should test localhost', async () => {
    assert.equal(await f('http://localhost:3000'), 'HTTP/localhost');
  });

  it('should test 127.0.0.1', async () => {
    assert.equal(await f('http://127.0.0.1:3000'), 'HTTP/localhost');
  });

  it('should test whatever', async () => {
    assert.equal(await f('http://whatever:3000'), 'HTTP/whatever.' + msDomain);
  });

  it('should test ' + `http://whatever.${msDomain}:3000`, async () => {
    assert.equal(
      await f(`http://whatever.${msDomain}:3000`),
      'HTTP/whatever.' + msDomain
    );
  });
  it('should test http://whatever.foo.bar:3000', async () => {
    assert.equal(
      await f('http://whatever.foo.bar:3000'),
      'HTTP/whatever.foo.bar'
    );
  });

  it('should test http://whatever.foo.bar:3000/foo/bar', async () => {
    assert.equal(
      await f('http://whatever.foo.bar:3000/foo/bar'),
      'HTTP/whatever.foo.bar'
    );
  });

  it('should test http://whatever.foo.bar/foo/bar', async () => {
    assert.equal(
      await f('http://whatever.foo.bar/foo/bar'),
      'HTTP/whatever.foo.bar'
    );
  });

  it('should test http:///whatever.foo.bar:3000', async () => {
    try {
      await f('http:///whatever.foo.bar:3000');
    } catch (e) {
      assert.equal(
        (e as Error).message,
        'url is not well parsed. url=http:///whatever.foo.bar:3000'
      );
    }
  });
});
