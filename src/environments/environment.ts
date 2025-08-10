import packageJson from '../../package.json';

// Local development
export const environment = {
  production: false,
  envName: 'local',
  cloudflareProject: 'none',
  apiUrl: 'http://localhost:4200/api',
  version: packageJson.version,
  buildDate: new Date().toISOString(),
};
