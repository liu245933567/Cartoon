import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const NavigationComponent = loadable(() =>
  import(/* webpackChunkName: "navigation" */ './views/Navigation')
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={NavigationComponent}></Route>
      </Router>
    );
  }
}

export default App;
