// Importing packages and modules
const express = require('express');
const app = express();
const router = require('./routes/routes');
const User = require('./db/user');
const Blog = require('./db/blog');
const sequelize = require('./util/mySqlDb');

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: "true" }))
app.use(express.json());
// Serving static files from the current directory
app.use(express.static(__dirname))

// Setting the EJS up 
app.set('view engine', 'ejs')
//  parsing URL-encoded data
app.use(express.urlencoded({ extended: false }))

// handling routes
app.use(router)

// Defining a relationship between the models 
Blog.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Blog);

// Syncing the Sequelize models with the database
sequelize.sync()
// Uncomment the line below to force syncing and recreate tables (useful during development)
// sequelize.sync({ force: true })
    .then(result => {
        // Starting the Express app and listening on port 3000
        app.listen(3000, function () {
            console.log('Server is up and running on port 3000');
        })
    })
    .catch(err => {
        console.log(err);
    })
