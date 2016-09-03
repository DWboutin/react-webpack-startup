const appPort = 3000;

const config = {
  APP_NAME: 'React Startup',
  APP_PORT: appPort,
  BASE_URL: 'http://localhost:' + appPort, // 'http://vm1.mboutin2.dev.lan:3000'
  APP_DOM_CONTAINER: 'react-startup',
};

process.env.ROOT_FOLDER = __dirname;

export default config;