const env = process.env['NODE_ENV'] || 'development';

const config =  {
  development: {
    rolloutServiceHost: 'http://localhost',
    rolloutServicePort: '9999',
    port: 1234
  },
  production: {
    rolloutServiceHost: 'https://rollout-srv.fiverr-gw.com',
    rolloutServicePort: 443,
    port: 1234
  }
};

module.exports = config[env];
