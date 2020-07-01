/*
 * @Author: LiuYh
 * @Description: NormalPage 组件类型声明
 * @Date: 2020-07-01 10:53:59
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-01 11:12:25
 */

export interface INormalPageProps {
  /** 是否显示头部 */
  showHeader: boolean;
  /** 自定义头部组件 */
  customHeader: React.ReactNode;
  /** 是否显示底部组件 */
  showFooter: boolean;
  /** 自定义底部组件 */
  customFooter: React.ReactNode;
  /** 子元素 */
  children: React.ReactNode;
}
