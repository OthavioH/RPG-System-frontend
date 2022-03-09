import envVars from './env.json';

console.log(`${__dirname}`)

export const environment = {
  production: true,
  apiUrl: envVars.apiUrl,
};
