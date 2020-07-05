export interface UserInfo1 {
  name: string;
  password: string;
  passwordAge?: number;
  priv?: number;
  homeDir?: string;
  comment?: string;
  flags?: number;
  scriptPath?: string;
}

export interface NetApi {
  /**
   * create a windows user account
   *
   * @param {string} serverName
   * @param {number} levelData
   * @param {UserInfo1} userInfo
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
