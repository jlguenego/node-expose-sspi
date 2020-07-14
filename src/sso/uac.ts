/**
 * Test if the current user token has admin privileges.
 *
 * If this function return false, it means that operations that
 * requires admin rights cannot be done, even if the account is
 * configured with admin right. Functions that require admin right
 * would return the error 5 (admin right required).
 *
 * Example: `netapi.NetUserAdd` function can be called only
 * if the user token has admin privilege.
 *
 * @export
 * @returns {boolean}
 */
export function hasAdminPrivileges(): boolean {
  // TODO: to be implemented.
  return true;
}
