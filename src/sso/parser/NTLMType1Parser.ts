import dbg from 'debug';
import { Flag, Props } from '../interfaces';
import { AbstractParser } from './AbstractParser';

const debug = dbg('node-expose-sspi:ntlm-parser');

const ntlmFlags: Flag[] = [
  { label: 'Negotiate Unicode', value: 0x1 },
  { label: 'Negotiate OEM', value: 0x2 },
  { label: 'Request Target', value: 0x4 },
  { label: 'Negotiate NTLM', value: 0x200 },
  { label: 'Negotiate Domain Supplied', value: 0x1000 },
  { label: 'Negotiate Workstation Supplied', value: 0x2000 },
  { label: 'Negotiate Always Sign', value: 0x8000 },
  { label: 'Negotiate 128', value: 0x20000000 },
  { label: 'Negotiate 56', value: 0x80000000 },
];

function getFlags(flags: Flag[], value: number): string {
  const str = flags
    .map((flag) => (value & flag.value ? flag.label : ''))
    .join('\n');
  return str;
}

export class NTLMType1Parser extends AbstractParser {
  constructor(buffer: ArrayBuffer) {
    super(buffer);
  }
  parse(): Props {
    const flag = new Uint32Array(this.buffer.slice(12, 16))[0];
    debug('flag: ', flag.toString(16));

    const result: Props = {
      messageType: 'NTLM Type 1',
      flags: getFlags(ntlmFlags, flag),
    };

    return result;
  }
}
