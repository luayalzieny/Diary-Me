// Importing Sequelize library
const Sequelize = require('sequelize');
// Importing the Sequelize instance for MySQL database
const sequelize = require('./../util/mySqlDb');

// Defining a Sequelize model named 'post' for the 'blog' table
//made up of id,title,post and userid
const post = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    post: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
});

// Exporting the 'post' model for use in other parts of the application
module.exports = post;
