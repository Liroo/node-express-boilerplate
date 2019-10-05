/*
  This is the file to import just after dotenv/config
  it filled global object
*/

let logs = [];
try {
  logs = JSON.parse(process.env.LOGS);
} catch(e) {
  logs = [];
}

global.env = {
  __APP_VERSION__: process.env.npm_package_version || '6.12.95',

  server: {
    port: process.env.SERVER_PORT || 3000,
  },

  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost',
    db: process.env.MONGO_DB || 'seoto_default',
  },

  key: {
    jwtSecret: process.env.JWT_SECRET || '[JWT_SECRET]',
    forgetPasswordJwtSecret: process.env.FORGET_PASSWORD_JWT_SECRET || '[FORGET_PASSWORD_JWT_SECRET]',
  },

  logs: {
    warn: logs.includes('WARN'),
    log: logs.includes('LOG'),
    error: logs.includes('ERROR'),
    success: logs.includes('SUCCESS'),
  },

  mailer: {
    transportHost: process.env.MAILER_TRANSPORT_HOST,
    transportPort: process.env.MAILER_TRANSPORT_PORT,
    transportAuthUser: process.env.MAILER_TRANSPORT_AUTH_USER,
    transportAuthPass: process.env.MAILER_TRANSPORT_AUTH_PASS,
    from: process.env.MAILER_FROM_DEFAULT,
  },

  nodeEnv: process.env.NODE_ENV || 'development',
  __DEV__: process.env.NODE_ENV === 'development',
};
