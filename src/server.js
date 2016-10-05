import express from 'express';

import config from './config';

import reactRouting from 'middlewares/reactRouting';
import webpackDevServer from 'middlewares/webpackDevServer';

const { APP_NAME, APP_PORT, PROD_ENV } = config;

const app = express();

if (!PROD_ENV) {
  webpackDevServer(app);
}

app.use('/assets', express.static(`${process.env.ROOT_FOLDER}/public`));

app.use(reactRouting);

app.listen(APP_PORT, () => {
  console.log(APP_NAME + ' is listening on port ' + APP_PORT + '; Env: ' + process.env.NODE_ENV);
});

export default app;
