import { Flag } from '../interfaces';
import { OSVersionStructure, SecurityBuffer } from './interfaces';

export const ntlmFlags: Flag[] = [
  { label: 'UNICODE', value: 0x1 },
  { label: 'OEM', value: 0x2 },
  { label: 'REQUEST_TARGET', value: 0x4 },
  { label: 'NTLM', value: 0x200 },
  { label: 'DOMAIN_SUPPLIED', value: 0x1000 },
  { label: 'WORKSTATION_SUPPLIED', value: 0x2000 },
  { label: 'ALWAYS_SIGN', value: 0x8000 },
  { label: 'NEG_28', value: 0x20000000 },
  { label: 'NEG_56', value: 0x80000000 },
];

export function getSecBuf(buffer: ArrayBuffer, offset: number): SecurityBuffer {
  const dataView = new DataView(buffer, offset);
  return {
    length: dataView.getInt16(0, true), // short little endian
    allocated: dataView.getInt16(2, true), // short little endian
    offset: dataView.getInt32(4, true), // long little endian
  };
}

export function getOSVersionStructure(
  buffer: ArrayBuffer,
  offset: number
): OSVersionStructure {
  const dataView = new DataView(buffer, offset);
  return {
    majorVersion: dataView.getInt8(0), // byte
    minorVersion: dataView.getInt8(1), // byte
    buildNumber: dataView.getInt16(2, true), // short little endian
    unknown: dataView.getInt32(4, false), // long
  };
}

export function getSecBufData(
  buffer: ArrayBuffer,
  secBuf: SecurityBuffer
): string {
  const buf = buffer.slice(secBuf.offset, secBuf.offset + secBuf.length);
  const str = Buffer.from(buf).toString('utf8');
  return str;
}
