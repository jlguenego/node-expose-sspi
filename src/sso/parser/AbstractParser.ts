import { Props } from '../interfaces';

export class AbstractParser {
  constructor(protected buffer: ArrayBuffer) {}
  parse(): Props {
    return {
      messageType: 'unknown (or not yet implemented)',
    };
  }
}
