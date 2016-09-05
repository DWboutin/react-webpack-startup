import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'middlewares/thunkMiddleware';

import Html from 'src/Html.react';

import routes from 'routes';
import reducers from 'reducers';

const store = applyMiddleware(thunkMiddleware)(createStore)(reducers);

function reactRouting(req, res, next) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const state = store.getState();
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.status(200).send('<!DOCTYPE html>\n' + renderToString(<Html component={component} initialState={state} />));
    } else {
      res.status(404).send('Not found');
    }
  });

  next();
}

export default reactRouting;
