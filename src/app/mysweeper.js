
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import INITIAL_STORE_STATE from 'store/initialState';
import reducer from 'store/reducers';
import { Settings } from 'components';


console.log('React: %o', React);
console.log('Provider: %o', Provider);
console.log('Router: %o, browserHistory: %o', Router, browserHistory);
console.log('Settings: %o', Settings);

const enhancer = compose(applyMiddleware(logger));
const store = createStore(reducer, INITIAL_STORE_STATE, enhancer);

console.log("store: %o", window.store = store);

const ROOT_NODE = document.getElementById('app');

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Redirect from="/" to="/new" />

            <Route path="/new" component={Settings} />
        </Router>
    </Provider>,
ROOT_NODE);
