require('dotenv').config();

module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 80
    },
    database: {
        host: process.env.DB_HOST || '69.57.172.68',
        port: process.env.DB_PORT || 3306,
        db: process.env.DB_NAME || 'meanapps_ums',
        username: process.env.DB_USER || 'meanapps_adminmahesh',
        password: process.env.DB_PASSWORD || 'Mysql@12345',
        securitykey: process.env.SECURITY_KEY || 'UMSAPP'
    },
    email: {
        name: process.env.MAIL_NAME,
        password: process.env.MAIL_PASSWORD
    }
}