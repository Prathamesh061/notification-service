const requiredEnv = [
    'MONGO_URI',
    'JWT_SECRET',
    'EMAIL_USER',
    'EMAIL_PASS',
    'FROM_EMAIL',
    'HOST',
    'PORT',
    'SMTP_HOST',
    'SMTP_PORT',
    'ENVIRONMENT',
    'JWT_EXPIRE_IN_DAYS'
];

const missing = requiredEnv.filter(key => !process.env[key]);
if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
}

const HOST = process.env.HOST;
const PORT = process.env.PORT;

module.exports = {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireInDays: process.env.JWT_EXPIRE_IN_DAYS,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    fromEmail: process.env.FROM_EMAIL,
    smtpPort: process.env.SMTP_PORT,
    smtpHost: process.env.SMTP_HOST,
    port: process.env.PORT,
    host: process.env.HOST,
    environment: process.env.ENVIRONMENT,
    apiBaseUrl: `http://${HOST}:${PORT}/api`
};
