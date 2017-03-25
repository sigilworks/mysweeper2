
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, browserHistory, hashHistory } from 'react-router';

import { Settings } from 'components';

const _ = require('lodash');



console.log('React: %o', React);
console.log('Provider: %o', Provider);
console.log('Router: %o, browserHistory: %o', Router, browserHistory);
console.log('Settings: %o', Settings);
console.log('_: %o', (window._ = _));

const ROOT_NODE = document.getElementById('app');

render(
    <Router history={hashHistory}>
        <Route path="/" component={Settings} />

    </Router>,
ROOT_NODE);
/*

    <Provider store={props.store}>
        <Router history={browserHistory}>
            <Route path="/" component={Settings} />
        </Router>
    </Provider>*/
