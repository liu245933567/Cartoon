import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';

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
      <Router>
        <Route exact path="/" component={NavigationComponent}></Route>
        <Route
          exact
          path="/cartoonDeatil/:detailPath"
          component={CartoonDeatil}
        ></Route>
        <Route
          path="/sectionDetail/:detailPath"
          component={SectionDeatil}
        ></Route>
      </Router>
    );
  }
}

export default App;
