// Importing Sequelize library
const Sequelize = require('sequelize');
// Importing the Sequelize instance for MySQL database
const sequelize = require('../util/mySqlDb');

// Schema creation for the 'user' table
const User = sequelize.define('user', {
    // Definition of the 'id' column
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

// Exporting the 'User' model for use in other parts of the application
module.exports = User;
