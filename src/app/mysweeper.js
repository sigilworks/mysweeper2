
import Constants from './constants/constants';

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

const _ = require('lodash');


console.log('Constants: %o', Constants);

console.log('React: %o', React);
console.log('Provider: %o', Provider);
console.log('Router: %o, browserHistory: %o', Router, browserHistory);

console.log('_: %o', (window._ = _));

export default function App(props) {
  return (
    <Provider store={props.store}>
        <Router history={browserHistory}>

        </Router>
    </Provider>
  );
}