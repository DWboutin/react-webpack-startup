import React from 'react';
import { renderToString } from 'react-dom/server';

import config from 'config';

const { APP_NAME, BASE_URL, APP_DOM_CONTAINER, PROD } = config;

function Html(props) {
  const { component } = props;
  const initialState = JSON.stringify(props.initialState);
  const configs = JSON.stringify(config);

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <title>{ APP_NAME }</title>
      <link rel="stylesheet" href={`${BASE_URL}/assets/css/style.css`} />
      <script dangerouslySetInnerHTML={{ __html: 'window.INITIAL_STATE = ' + initialState + '; window.CONFIG = ' + configs }} />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en,~locale.fr" />
    </head>
    <body>
      <div id={ APP_DOM_CONTAINER } dangerouslySetInnerHTML={{ __html: renderToString(component) }} />
      <script src={ PROD && BASE_URL + '/assets/js/app.min.js' || BASE_URL + '/assets/js/app.js' } />
    </body>
    </html>
  );
}

Html.propTypes = {
  initialState: React.PropTypes.object,
  component: React.PropTypes.object,
};

export default Html;
