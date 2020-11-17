import { toHex } from '../misc';
import { AbstractParser } from './AbstractParser';
import { NTLMType1Parser } from './NTLMType1Parser';
import { NTLMType2Parser } from './NTLMType2Parser';

export class ParserFactory {
  static instantiateFromContent(buffer: ArrayBuffer) {
    const str = toHex(buffer);
    const prefix = str.substring(0, 24);
    if (prefix === '4e544c4d5353500001000000') {
      return new NTLMType1Parser(buffer);
    }
    if (prefix === '4e544c4d5353500002000000') {
      return new NTLMType2Parser(buffer);
    }
    return new AbstractParser(buffer);
  }
}
