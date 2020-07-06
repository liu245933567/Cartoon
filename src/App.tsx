import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import store from '@redux/store';

/** 导航页 */
const NavigationComponent = loadable(() =>
  import(/* webpackChunkName: "navigation" */ './views/Navigation')
);

/** 动漫详情页 */
const CartoonDeatil = loadable(() =>
  import(/* webpackChunkName: "cartonDeatil" */ './views/CartoonDetail')
);

/** 章节详情页 */
const SectionDeatil = loadable(() =>
  import(/* webpackChunkName: "cartonDeatil" */ './views/SectionDetail')
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={NavigationComponent}></Route>
          <Route
            exact
            path="/cartoonDeatil"
            component={CartoonDeatil}
          ></Route>
          <Route
            path="/sectionDetail"
            component={SectionDeatil}
          ></Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
