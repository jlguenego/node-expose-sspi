import { ASN1 } from '@jlguenego/asn.1';
import { ASN1MsgUtils } from '@jlguenego/asn.1/build/src/ASN1MsgUtils';
import { EncodingRule } from '@jlguenego/asn.1/build/src/EncodingRule';

interface KrbApReq {
  principalName: string;
  realm: string;
}

export function getKerberosDetails(buffer: ArrayBuffer) {
  const message = ASN1.parseMsg(buffer, {
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
