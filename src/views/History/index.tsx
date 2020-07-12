import React from 'react';
import NormalPage from '@components/NormalPage';
import { getCartoonHistory } from '@store/cartoon';
import { ICartoonHistory } from '@typings/cartoon';
import CartoonList from '@components/CartoonNormalList';
import Scroll from '@components/Scroll';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '@redux/reducers';
import { requestCartoonDeatilInfo } from '@redux/actions/cartoon';

type IProps = RouteComponentProps & {
  requestCartoonDeatilInfo: typeof requestCartoonDeatilInfo;
};

class History extends React.Component<IProps> {
  render() {
    // console.log(getCartoonHistory());
    let history: ICartoonHistory[] = [];
    const getCartoonHistoryObj = getCartoonHistory();

    console.log(getCartoonHistoryObj);

    if (getCartoonHistoryObj) {
      for (let key in getCartoonHistoryObj) {
        history.push(getCartoonHistoryObj[key]);
      }
    }
    console.log(history);
    return (
      <NormalPage headerText="历史记录">
        <div className="History-Page-Wrapper">
          <Scroll>
            <h3 className="history-title">动漫记录</h3>
            <CartoonList
              cartoonList={history}
              clickHandle={(cartoonInfo) => {
                this.props.requestCartoonDeatilInfo(
                  { cartoonPath: cartoonInfo.detailHref },
                  () => {
                    this.props.history.push({
                      pathname: 'cartoonDeatil'
                    });
                  }
                );
              }}
            />
          </Scroll>
        </div>
      </NormalPage>
    );
  }
}

export default connect(
  (state: AppState) => state.cartoon,
  (dispatch) =>
    bindActionCreators(
      {
        requestCartoonDeatilInfo
      },
      dispatch
    )
)(History);
