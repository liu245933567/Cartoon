/*
 * @Author: LiuYh
 * @Description: 轮播图组件
 * @Date: 2020-07-03 02:31:12
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 14:54:16
 */

import React from 'react';
import BScroll from 'better-scroll';
import { addClass } from '@utils/dom';
import { autobind } from 'core-decorators';

interface IProps {
  /** 是否开启轮播 */
  loop: boolean;
  /** 是否自动轮播 */
  autoPlay: boolean;
  /** 轮播时间 */
  interval: number;
  /** 绑定的数据 */
  data: any;
}
interface IState {
  /** 当前锚点索引 */
  currentPageIndex: number;
  /** 锚点数组 */
  dots: any[] | null | undefined;
}

class Slider extends React.Component<IProps, IState> {
  /** 最外层容器 */
  private sliderWrapper: React.RefObject<HTMLDivElement>;
  /** 轮播容器 */
  private sliderGroup: React.RefObject<HTMLDivElement>;
  /** 轮播计时器 */
  private timer: NodeJS.Timeout | null;
  /** BScroll实例 */
  private slider: BScroll | null;

  constructor(props: any) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      dots: []
    };
    this.sliderWrapper = React.createRef();
    this.sliderGroup = React.createRef();
    this.slider = null;
    this.timer = null;
  }

  public componentDidMount() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();

      if (this.props.autoPlay) {
        this._play();
      }
    }, 20);

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  }

  public componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public componentDidUpdate(pevProps: IProps) {
    if (JSON.stringify(pevProps.data) !== JSON.stringify(this.props.data)) {
      if (!this.slider) {
        return;
      }
      this._initDots();
      this._setSliderWidth(true);
      this.slider.refresh();
    }
  }

  /** 设置轮播图宽度 */
  @autobind
  _setSliderWidth(isResize?: boolean) {
    let children = this.sliderGroup.current?.children;

    let width = 0;
    let sliderWidth = this.sliderWrapper.current?.clientWidth || 0;

    if (children) {
      for (let i = 0; i < children.length; i++) {
        let child = children[i] as HTMLElement;

        addClass(child, 'slider-item');

        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
    }

    if (this.props.loop && !isResize) {
      width += 2 * sliderWidth;
    }
    this.sliderGroup.current!.style.width = width + 'px';
  }

  /** 初始化轮播图 */
  @autobind
  private _initSlider() {
    const { autoPlay } = this.props;

    this.slider = new BScroll(this.sliderWrapper.current as HTMLDivElement, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: true,
        threshold: 0.3,
        speed: 400
      }
    });

    this.slider.on('scrollEnd', () => {
      let pageIndex = this.slider!.getCurrentPage().pageX;

      // if (loop) {
      //   pageIndex -= 1;
      // }
      this.setState({
        currentPageIndex: pageIndex
      });

      if (autoPlay) {
        this._play();
      }
    });

    this.slider.on('beforeScrollStart', () => {
      if (autoPlay && this.timer) {
        clearTimeout(this.timer);
      }
    });
  }

  /** 初始化轮播图点 */
  @autobind
  _initDots() {
    this.setState({
      dots: React.Children.map(this.props.children, () => ({}))
    });
  }

  /** 开始滚动轮播图 */
  @autobind
  _play() {
    let pageIndex = this.state.currentPageIndex + 1;

    // if (this.props.loop) {
    //   pageIndex += 1;
    // }
    this.timer = setTimeout(() => {
      this.slider!.goToPage(pageIndex, 0, 400);
    }, this.props.interval);
  }

  render() {
    const { currentPageIndex, dots } = this.state;
    const { children } = this.props;

    return (
      <div className="Slider-Component-Wrapper" ref={this.sliderWrapper}>
        <div className="slider-group" ref={this.sliderGroup}>
          {children}
        </div>
        <div className="dots">
          {dots &&
            dots.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`dot ${
                    currentPageIndex === index ? 'active' : ''
                  }`}
                ></span>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Slider;
