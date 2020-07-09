import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import store from '@redux/store';
import {requestLoginStatus} from '@redux/actions/user';

/** 导航页 */
// const NavigationComponent = loadable(() =>
//   import(/* webpackChunkName: "navigation" */ './views/Navigation')
// );

/** 动漫首页 */
const Cartoon = loadable(() =>
  import(/* webpackChunkName: "navigation" */ './views/Cartoon')
);

/** 用户页 */
const User = loadable(() =>
  import(/* webpackChunkName: "cartonDeatil" */ './views/User')
);

/** 动漫详情页 */
const CartoonDeatil = loadable(() =>
  import(/* webpackChunkName: "cartonDeatil" */ './views/CartoonDetail')
);

/** 章节详情页 */
const SectionDeatil = loadable(() =>
  import(/* webpackChunkName: "cartonDeatil" */ './views/SectionDetail')
);

/** 登录页 */
const Login = loadable(() =>
  import(/* webpackChunkName: "cartonDeatil" */ './views/Login')
);

class App extends React.Component {
  public componentDidMount() {
    requestLoginStatus()(store.dispatch);
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Cartoon} />
          <Route path="/user" component={User} />
          <Route path="/cartoonDeatil" component={CartoonDeatil} />
          <Route path="/sectionDetail" component={SectionDeatil} />
          <Route path="/login" component={Login} />
        </Router>
      </Provider>
    );
  }
}

export default App;
