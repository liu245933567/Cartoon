import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import store from '@redux/store';
import { requestLoginStatus } from '@redux/actions/user';
import { cartoonHistory } from '@services/cartoon';
import { initCartoonHistory } from '@store/cartoon';

/** 导航页 */
// const NavigationComponent = loadable(() =>
//   import(/* webpackChunkName: "navigation" */ './views/Navigation')
// );

/** 动漫首页 */
const Cartoon = loadable(() => import('./views/Cartoon'));
/** 用户页 */
const User = loadable(() => import('./views/User'));
/** 及历史录 */
const History = loadable(() => import('./views/History'));
/** 动漫详情页 */
const CartoonDeatil = loadable(() => import('./views/CartoonDetail'));
/** 章节详情页 */
const SectionDeatil = loadable(() => import('./views/SectionDetail'));
/** 登录页 */
const Login = loadable(() => import('./views/Login'));
/** 头像上传 */
const ImageUploader = loadable(() => import('./views/EditUserInfo'));

class App extends React.Component {
  public componentDidMount() {
    requestLoginStatus()(store.dispatch);
    this.getHistory();
  }
  private async getHistory() {
    const { data } = await cartoonHistory();

    if (data.isOk && data.result) {
      initCartoonHistory(data.result);
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Cartoon} />
          <Route path="/user" component={User} />
          <Route path="/history" component={History} />
          <Route path="/imageUploader" component={ImageUploader} />
          <Route path="/cartoonDeatil" component={CartoonDeatil} />
          <Route path="/sectionDetail" component={SectionDeatil} />
          <Route path="/login" component={Login} />
        </Router>
      </Provider>
    );
  }
}

export default App;
