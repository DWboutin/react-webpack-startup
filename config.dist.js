const appPort = 3000;

const config = {
  APP_NAME: 'React Startup',
  APP_PORT: appPort,
  BASE_URL: `http://localhost:${appPort}`,
  APP_DOM_CONTAINER: 'react-startup',
};

process.env.ROOT_FOLDER = __dirname;

export default config;
