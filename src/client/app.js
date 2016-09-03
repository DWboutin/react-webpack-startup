import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Router, match, browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import config from 'config';
import routes from 'routes';
import reducers from 'reducers';
import thunkMiddleware from 'middlewares/thunkMiddleware';

const { APP_DOM_CONTAINER } = config;
const initialState = window.__INITIAL_STATE__;

const history = browserHistory;
const reduxRouterMiddleware = routerMiddleware(history);

const configureStore = compose(applyMiddleware(thunkMiddleware, reduxRouterMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
const store = configureStore(reducers, initialState);

history.listen(() => {
  match({ history, routes }, (routerError, redirectLocation, renderProps) => {
    if (renderProps) {
      ReactDOM.render((
        <Provider store={store}>
          <Router history={history}>{routes}</Router>
        </Provider>
      ), document.getElementById(APP_DOM_CONTAINER));
    }
  });
});
