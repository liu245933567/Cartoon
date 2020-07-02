import React from 'react';
import NormalPage from '@components/NormalPage';
import { autobind } from 'core-decorators';
import { RouteComponentProps } from 'react-router-dom';
import { cartoonDeatilInfo } from '@services/cartoon';
import { CartoonDetail as ICartoonDetail } from '@typings/cartoon';

type IProps = RouteComponentProps<{ detailPath: string }>;
type TState = {
  cartoonInfo: ICartoonDetail | null;
};

class CartoonDetail extends React.Component<IProps, TState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cartoonInfo: null
    };
  }

  public componentDidMount() {
    this.getDeatilInfo();
  }
  /** 获取动漫详情信息 */
  @autobind
  private async getDeatilInfo() {
    const cartoonPath = this.props.match.params.detailPath;
    const { data } = await cartoonDeatilInfo({ cartoonPath: decodeURIComponent(cartoonPath) });

    if (data.isOk) {
      console.log(data.result);
      this.setState({
        cartoonInfo: data.result
      });
    }
  }
  render() {
    return (
      <NormalPage>
        <div className="CartoonDetail-Page-Wrapper">
          <div className="Cartoon-Info-Wrapper">动漫信息</div>
          <div className="Cartoon-Section-List-Wrapper">章节列表</div>
        </div>
      </NormalPage>
    );
  }
}

export default CartoonDetail;
