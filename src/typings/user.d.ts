/** 数据库存入信息 */
export interface IUserInfo {
  /** 手机号 */
  phoneNo: string;
  /** 座右铭 */
  motto: string | null;
  /** 会员等级 */
  level: number;
  /** 是否是VIP */
  isVip: boolean;
  /** 头像 */
  headPortrait: string | null;
  /** 密码 */
  password: string;
  /** 邮箱 */
  email: string | null;
  /** 昵称 */
  nickname: string;
  /** 性别 */
  gender: 'male' | 'famale';
  /** 生日 */
  brithday: Date;
  /** 创建日期 */
  createDate: Date;
  /** 上次登录时间 */
  lastLoginTime: Date;
}

/** 返回的用户信息 */
export interface IUserResInfo {
  /** 手机号 */
  phoneNo: string;
  /** 座右铭 */
  motto: string | null;
  /** 会员等级 */
  level: number;
  /** 是否是VIP */
  isVip: boolean;
  /** 头像 */
  headPortrait: string | null;
  /** 邮箱 */
  email: string | null;
  /** 昵称 */
  nickname: string;
  /** 性别 */
  gender: 'male' | 'famale';
  /** 生日 */
  brithday: string;
  /** 创建日期 */
  createDate: string;
  /** 上次登录时间 */
  lastLoginTime: string;
}

/** 登录参数 */
export interface ILoginParam {
  /** 手机号 */
  phoneNo: string;
  /** 密码 */
  password: string;
}
