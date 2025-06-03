import Constants from 'expo-constants';

const ENV = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    webUrl: 'http://localhost:3000',
    appName: 'PAWW Dev',
    logLevel: 'debug'
  },
  snapshot: {
    apiUrl: 'https://api-staging.paww.app/api',
    webUrl: 'https://staging.paww.app',
    appName: 'PAWW Snapshot',
    logLevel: 'info'
  },
  production: {
    apiUrl: 'https://api.paww.app/api',
    webUrl: 'https://paww.app',
    appName: 'PAWW',
    logLevel: 'error'
  }
};

const getEnvVars = () => {
  const appEnv = Constants.expoConfig?.extra?.appEnv || 'development';
  return ENV[appEnv];
};

export default getEnvVars(); 