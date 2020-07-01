import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setRemAdapter } from '@utils/rem';
import '@styles';

setRemAdapter(document, window);

ReactDOM.render(<App />, document.getElementById('root'));
