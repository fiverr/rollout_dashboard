const env = process.env['NODE_ENV'] || 'development';
const rc = require('rc');
const dotenv = require('dotenv');
dotenv.load({silent: true});

const config =  {
  rolloutServiceHost: process.env['SERVICE_HOST'],
  rolloutServicePort: process.env['SERVICE_PORT'] || 443,
  port: process.env['PORT'] || '{{ key "configurations/microservices/rollout/rollout-dashboard-port" }}',
  googleAuth: {
    apiKey: process.env['GAPI_KEY'] || '{{ key "configurations/microservices/rollout/google-auth-api-key" }}',
    clientId: process.env['GAPI_CLIENT_ID'] || '{{ key "configurations/microservices/rollout/google-auth-client-id" }}'
  }
};

module.exports = config;
