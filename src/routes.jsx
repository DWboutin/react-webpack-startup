import React from 'react';
import { Route } from 'react-router';

import App from 'components/App.react.jsx';
import TestComponent from 'components/TestComponent.react.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="test" component={TestComponent} />
  </Route>
);
