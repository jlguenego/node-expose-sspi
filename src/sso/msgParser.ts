import { ntlmParse } from 'ntlm-parser';
import { Props } from '../../lib/api';

export function negotiateParse(base64: string): Props {
  const object = ntlmParse(base64);
  return (object as unknown) as Props;
}
