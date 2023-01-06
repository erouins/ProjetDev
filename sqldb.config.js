const Sequelize = require("sequelize");
module.exports = new Sequelize({
    dialect: 'mssql',
    host: 'cesieat-sqlserver.database.windows.net',
    port: process.env.SQL_PORT,
    username: process.env.SQL_ADMIN_NAME,
    password: process.env.SQL_ADMIN_PWD,
    database: 'cesieat'
});
    // config for your database

