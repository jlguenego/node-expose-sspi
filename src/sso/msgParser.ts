import dbg from 'debug';
import { ParserFactory } from './parser/ParserFactory';

const debug = dbg('node-expose-sspi:msgParser');

export function messageDebug(buffer: ArrayBuffer) {
  const parser = ParserFactory.instantiateFromContent(buffer);
  const message = parser.parse();
  debug('message: ', message);
}
