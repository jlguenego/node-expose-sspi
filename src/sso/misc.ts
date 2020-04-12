import dbg from 'debug';

const debug = dbg('node-expose-sspi:misc');

function isPrintable(keycode: number): boolean {
  const valid =
    (keycode > 47 && keycode < 58) || // number keys
    keycode === 32 || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91) || // letter keys
    (keycode > 95 && keycode < 112) || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223); // [\]' (in order)
  return valid;
}

/**
 * Gives a string representation of binary data.
 *
 * @param {ArrayBuffer} buffer
 * @returns {string} the string representation.
 */
export function hexDump(buffer: ArrayBuffer): string {
  const dataView = new DataView(buffer, 0);
  debug('buffer length', buffer.byteLength);
  let result = '';
  let line = '';
  for (let i = 0; i < buffer.byteLength; i++) {
    if (i % 16 === 0) {
      line = '';
      const address = '0x' + i.toString(10).padStart(8, '0') + ':';
      result += address;
    }
    const n = dataView.getUint8(i);
    result += n.toString(16).padStart(2, '0') + ' ';
    let c = '.';
    if (isPrintable(n)) {
      c = String.fromCharCode(n);
    }
    line += c;
    if (i % 16 === 7) {
      result += ' ';
    }
    if (i === buffer.byteLength - 1) {
      const spaces = '   ';
      for (let j = 0; j < 15 - (i % 16); j++) {
        result += spaces;
      }
    }
    if (i % 16 === 15 || i === buffer.byteLength - 1) {
      result += ': ' + line + '\n';
      continue;
    }
  }
  return result;
}
