export interface IScrollProps {
  /**
   * 1 滚动的时候会派发scroll事件，会截流。
   * 2 滚动的时候实时派发scroll事件，不会截流。
   * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
   */
  probeType: number;
  /** 是否显示滚动条 */
  scrollbar: boolean;
  /** 点击列表是否派发click事件 */
  click: boolean;
  /** 是否开启横向滚动 */
  scrollX: boolean;
  /** 是否开启竖向滚动 */
  scrollY: boolean;
  /** 是否派发滚动事件 */
  listenScroll: boolean;
  /** 内容数据 */
  data: any;
  /** 是否派发滚动到底部的事件，用于上拉加载 */
  pullup: boolean;
  /** 是否派发顶部下拉的事件，用于下拉刷新 */
  pulldown: boolean;
  /** 是否派发列表滚动开始的事件 */
  beforeScroll: boolean;
  /** 当数据更新后，刷新scroll的延时 */
  refreshDelay: number;
  /** 下拉刷新距离 */
  pullupDistance: number;
  /** 上拉请求后是否有更多数据 */
  hasMore: boolean;
  /** 加载中显示的文字 */
  loadingText: string;
  /** 下拉加载提示文案 */
  pullDownText: string;
  /** 上拉加载提示文字 */
  pullUpText: string;
  /** 没有更多了提示 */
  noMoreText: string;
  /** 插槽内容 */
  // children: PropTypes.elementType,
  /** input className */
  inputClassName: string;
}

export interface IScrollState {
  pullDownStyle: {
    top: string;
  };
  pullUpStyle: {
    top: string;
  };
  /** 是否处于上拉请求状态 */
  isPullupLoading: boolean;
  /**
   * 下拉加载状态
   * HIDDEN: 隐藏
   * DOWN: "下拉加载"文字提示
   * RELEASE: "释放刷新"文字提示
   * LOADING: 显示 loading 动画
   * SUCCESS: "刷新成功"文字提示
   */
  pulldownStatus: string;
}
