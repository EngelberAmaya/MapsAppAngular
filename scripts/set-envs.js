const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapboxApiKey = process.env['MAPBOX_API_KEY'];

if (!mapboxApiKey) {
  throw new Error('MAPBOX_API_KEY is not set');
}

const envFileContent = `export const environment = {
  mapboxKey: '${mapboxApiKey}',
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
