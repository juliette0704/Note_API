const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Notes = sequelize.define('Notes', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    multimedia: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Notes;
