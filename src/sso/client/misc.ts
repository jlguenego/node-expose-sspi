import dns from 'dns';
import dbg from 'debug';

import { sysinfo } from '../../../lib/api';

const debug = dbg('node-expose-sspi:client');

/**
 * Get the SPN the same way Chrome/Firefox or IE does.
 *
 * Links:
 * - getting the domain name: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
 * - algo of IE : https://support.microsoft.com/en-us/help/4551934/kerberos-failures-in-internet-explorer
 *
 * @param {string} url
 * @returns {string}
 */
export async function getSPNFromURI(url: string): Promise<string> {
  const msDomainName = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
  if (msDomainName.length === 0) {
    debug('Client running on a host that is not part of a Microsoft domain');
    return 'whatever';
  }
  const matches = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i.exec(url);
  const urlDomain = matches && matches[1];
  if (!urlDomain) {
    throw new Error('url is not well parsed. url=' + url);
  }
  debug('urlDomain: ', urlDomain);
  if (['localhost', '127.0.0.1'].includes(urlDomain)) {
    return 'HTTP/localhost';
  }
  // needs urlFQDN for the DNS resolver.
  const urlFQDN = urlDomain.includes('.')
    ? urlDomain
    : urlDomain + '.' + msDomainName;
  let hostname = urlFQDN;
  try {
    while (true) {
      const records = await dns.promises.resolve(hostname, 'CNAME');
      debug('records', records);
      if (records.length === 0) {
        break;
      }
      hostname = records[0];
    }
  } catch (e) {
    debug('DNS error', e);
  }
  const result = 'HTTP/' + hostname;
  debug('result: ', result);
  return result;
}
