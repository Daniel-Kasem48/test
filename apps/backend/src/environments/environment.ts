export const environment = {
  production: false,
  appUrl: process.env.APP_URL || 'localhost:4444',
  apiUrl: process.env.API_URL || 'localhost:4444',
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  paths: {
    templates: process.env.EMAIL_TEMPLATES_PATH || 'assets/templates',
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DATABASE_SSL,
    logging: process.env.LOGGING,
  },
  mail: {
    service: process.env.MAIL_SERVICE,
    protocol: process.env.MAIL_PROTOCOL || 'smtp',
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT) || 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    from: {
      name: process.env.MAIL_FROM_NAME || 'IT-Plus',
      address: process.env.MAIL_FROM_ADDRESS,
    },
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  },
};
