const appPort = 3000;

const config = {
  APP_NAME: 'React Startup',
  APP_PORT: appPort,
  DEV_SERVER_PORT: 3001,
  BASE_URL: `http://localhost:${appPort}`,
  APP_DOM_CONTAINER: 'react-startup',
  PROD_ENV: (process.env.NODE_ENV === 'production'),
};

process.env.ROOT_FOLDER = __dirname;

export default config;
