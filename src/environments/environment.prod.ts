import packageJson from '../../package.json';

// Production deployment (radivue-prod project)
export const environment = {
  production: true,
  envName: 'production',
  cloudflareProject: 'radivue-prod',
  apiUrl: 'https://api.radivue.com',
  version: packageJson.version,
  buildDate: new Date().toISOString(),
};
