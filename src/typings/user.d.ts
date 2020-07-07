export interface IUserInfo {
  /** 用户名 */
  userName: string;
  /** 座右铭 */
  motto: string;
  /** 会员等级 */
  level: number;
  /** 是否是VIP */
  isVip: boolean;
  /** 头像 */
  headPortrait: string | null;
}
