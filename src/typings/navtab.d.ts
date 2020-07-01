export interface INavTabProps {
  /** 当前选中的tab */
  curNavTab: string,
  /** 点击 tab 的回调 */
  pressCallBack: (key:string) => void
}
