import { SecuritySupportProvider } from '../..';

export class ClientInfo {
  domain!: string;
  user!: string;
  password!: string;
  targetName!: string;
  ssp: SecuritySupportProvider = 'Negotiate';
}
