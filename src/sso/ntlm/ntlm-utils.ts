import { OSVersionStructure, SecurityBuffer } from './interfaces';

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
