import { UserInfo1Flag } from './flags';

export interface UserInfo1 {
  name: string;
  password: string;
  passwordAge?: number;
  priv?: number;
  homeDir?: string;
  comment?: string;
  flags?: UserInfo1Flag[];
  scriptPath?: string;
}

export interface NetApi {
  /**
   * create a windows user account.
   * 
   * By default userInfo flags is set to `['UF_SCRIPT']`.
   *
   * @param {string} serverName if undefined, then create a local account.
   * @param {number} levelData. Specify the userInfo structure. 1 is currently the only accepted.
   * @param {UserInfo1} userInfo specify username and password.
   * @memberof NetApi
   */
  NetUserAdd(serverName: string, levelData: number, userInfo: UserInfo1): void;

  /**
   * delete a windows user account
   *
   * @param {string} serverName
   * @param {string} username
   * @memberof NetApi
   */
  NetUserDel(serverName: string, username: string): void;
}
