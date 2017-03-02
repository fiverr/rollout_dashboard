const env = process.env['NODE_ENV'] || 'development';

const config =  {
  development: {
    rolloutServiceHost: 'http://localhost',
    rolloutServicePort: '9999',
    port: 1234,
    googleAuth: {
      apiKey: '',
      clientId: '',
    }
  },
  production: {
    rolloutServiceHost: '{{ key "configurations/microservices/rollout/rollout-service-url" }}',
    rolloutServicePort: '{{ key "configurations/microservices/rollout/rollout-service-port" }}',
    port: '{{ key "configurations/microservices/rollout/rollout-dashboard-port" }}',
    googleAuth: {
      apiKey: '{{ key "configurations/microservices/rollout/google-auth-api-key" }}',
      clientId: '{{ key "configurations/microservices/rollout/google-auth-client-id" }}'
    }
  }
};

module.exports = config[env];
