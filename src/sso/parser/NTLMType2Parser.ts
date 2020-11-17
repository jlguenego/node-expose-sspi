// import dbg from 'debug';
import { Props } from '../interfaces';
import { AbstractParser } from './AbstractParser';
import {
  getOSVersionStructure,
  getSecBuf,
  getSecBufData,
  ntlmFlags,
} from '../ntlm/ntlm-utils';
import { getFlags } from '../misc';
import { NTLMType1 } from '../ntlm/interfaces';

// const debug = dbg('node-expose-sspi:ntlm-parser');

export class NTLMType2Parser extends AbstractParser {
  constructor(buffer: ArrayBuffer) {
    super(buffer);
  }
  parse(): Props {
    const flag = new Uint32Array(this.buffer.slice(12, 16))[0];
    const result: NTLMType1 = {
      messageType: 'NTLM Type 1',
      flags: getFlags(ntlmFlags, flag),
    };

    if (this.buffer.byteLength === 16) {
      // NTLM version 1.
      return result;
    }
    result.suppliedDomain = getSecBuf(this.buffer, 16);
    result.suppliedWorkstation = getSecBuf(this.buffer, 24);

    if (result.suppliedDomain.offset !== 32) {
      // NTLM version 3: OS Version structure.
      result.osVersionStructure = getOSVersionStructure(this.buffer, 32);
    }

    result.suppliedDomainData = getSecBufData(
      this.buffer,
      result.suppliedDomain
    );
    result.suppliedWorkstationData = getSecBufData(
      this.buffer,
      result.suppliedWorkstation
    );

    return result;
  }
}
