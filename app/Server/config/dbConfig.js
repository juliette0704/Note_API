const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()
const config = {
    SECRET_KEY: process.env.SECRET_KEY
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mariadb"
});

module.exports = sequelize, config;
