export interface IUserInfo {
  /** 手机号 */
  phoneNo: number;
  /** 座右铭 */
  motto: string;
  /** 会员等级 */
  level: number;
  /** 是否是VIP */
  isVip: boolean;
  /** 头像 */
  headPortrait: string | null;
  // 密码
  password: string;
  // 邮箱
  email: string;
  // 昵称
  nickname: string;
  // 性别
  gender: string;
  // 生日
  brithday: Date;
  // 创建日期
  createDate: Date;
  // 上次登录时间
  lastLoginTime: Date;
}
