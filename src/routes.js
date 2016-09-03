import React from 'react';
import { Route } from 'react-router';

import App from 'components/App.react';
import TestComponent from 'components/TestComponent.react';

export default (
  <Route path="/" component={App}>
    <Route path="test" component={TestComponent} />
  </Route>
);
