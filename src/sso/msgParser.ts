import { ParserFactory } from './parser/ParserFactory';
import { decode } from 'base64-arraybuffer';
import { Props } from './interfaces';

export function negotiateParse(base64: string): Props {
  const buffer = decode(base64);
  const parser = ParserFactory.instantiateFromContent(buffer);
  const object = parser.parse();
  return object;
}
