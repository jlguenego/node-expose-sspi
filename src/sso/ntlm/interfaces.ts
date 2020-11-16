export interface SecurityBuffer {
  length: number;
  allocated: number;
  offset: number;
}

export interface OSVersionStructure {
  majorVersion: number;
  minorVersion: number;
  buildNumber: number;
  unknown: number;
}

export interface NTLMType1 {
  messageType: 'NTLM Type 1';
  flags: string;
  suppliedDomain?: SecurityBuffer;
  suppliedWorkstation?: SecurityBuffer;
  osVersionStructure?: OSVersionStructure;
  suppliedDomainData?: string;
  suppliedWorkstationData?: string;
}
