import express from 'express';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import proxyMiddleware from 'proxy-middleware';
import url from 'url';

import config from './config';
import webpackConfig from '../webpack.config';

import reactRouting from 'middlewares/reactRouting';

const { APP_NAME, APP_PORT, PROD_ENV, DEV_SERVER_PORT } = config;
console.log(APP_NAME, APP_PORT, PROD_ENV, DEV_SERVER_PORT);
const compiler = webpack(webpackConfig);

const app = express();

if (!PROD_ENV) {
  const server = new webpackDevServer(compiler, {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    inline: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  });

  server.listen(config.DEV_SERVER_PORT, 'localhost', (e) => {
    if (e) {
      console.error(e);
    }

    console.log('Dev server listening on ', config.DEV_SERVER_PORT);
  });

  app.use('/assets', proxyMiddleware(url.parse(`http://localhost:${DEV_SERVER_PORT}/assets`)));
}

app.use('/assets', express.static(`${process.env.ROOT_FOLDER}/public`));

app.use(reactRouting);

app.listen(APP_PORT, () => {
  console.log(APP_NAME + ' is listening on port ' + APP_PORT + '; Env: ' + process.env.NODE_ENV);
});

export default app;
