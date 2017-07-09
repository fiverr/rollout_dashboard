const env = process.env['NODE_ENV'] || 'development';
const rc = require('rc');

const config =  {
  development: {
    rolloutServiceHost: process.env['SERVICE_HOST'] || 'http://localhost',
    rolloutServicePort: process.env['SERVICE_PORT'] || '9999',
    port: process.env['PORT'] || 1234,
    googleAuth: rc('gauth', {})
  },
  production: {
    rolloutServiceHost: process.env['SERVICE_HOST'],
    rolloutServicePort: process.env['SERVICE_PORT'] || 443,
    port: process.env['PORT'] || '{{ key "configurations/microservices/rollout/rollout-dashboard-port" }}',
    googleAuth: {
      apiKey: '{{ key "configurations/microservices/rollout/google-auth-api-key" }}',
      clientId: '{{ key "configurations/microservices/rollout/google-auth-client-id" }}'
    }
  }
};

module.exports = config[env];
