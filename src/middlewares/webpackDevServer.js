import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import proxyMiddleware from 'proxy-middleware';
import url from 'url';

import config from 'config';
import webpackConfig from '../../webpack.config';

const { DEV_SERVER_PORT } = config;

export default (app) => {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    inline: true,
    publicPath: webpackConfig.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    stats: { colors: true },
  });

  server.listen(DEV_SERVER_PORT, 'localhost', (e) => {
    if (e) {
      console.error(e);
    }

    console.log('Dev server listening on ', DEV_SERVER_PORT);
  });

  app.use('/assets/js/app.js', proxyMiddleware(url.parse(`http://localhost:${DEV_SERVER_PORT}/assets/js/app.js`)));
};
