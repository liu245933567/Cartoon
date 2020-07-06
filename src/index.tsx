import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setRemAdapter } from '@utils/rem';
import '@styles';

setRemAdapter(document, window);

function start() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

function run() {
  start();
  if (module.hot) {
    module.hot.accept(start);
  }
}

run();
