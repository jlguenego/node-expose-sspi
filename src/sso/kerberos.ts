import { ASN1 } from '@jlguenego/asn.1';
import { inspect } from 'util';
import { ASN1MsgUtils } from '@jlguenego/asn.1/build/src/ASN1MsgUtils';
import { EncodingRule } from '@jlguenego/asn.1/build/src/EncodingRule';

interface KrbApReq {
  principalName: string;
  realm: string;
}

export function getKerberosDetails(buffer: ArrayBuffer) {
  const message = ASN1.decode(buffer, {
    encodingRule: EncodingRule.DER,
  });
  const array = ASN1MsgUtils.queryAll(message, 'tagLabel', 'GeneralString');
  const principalName = array
    .map((m) => m.value)
    .slice(1)
    .join('/');
  const realm = array[0].value as string;
  const result: KrbApReq = {
    principalName,
    realm,
  };
  return result;
}

export function getKerberosResponseDetails(buffer: ArrayBuffer) {
  const message = ASN1.decode(buffer, {
    encodingRule: EncodingRule.DER,
  });
  const msgId = ASN1MsgUtils.query(message, 'tagLabel', '15');
  if (msgId) {
    return 'Regular KRB_AP_REP message';
  }
  return (
    'probably an GSS-API KRB_ERROR message: ' + inspect(message, false, null)
  );
}
