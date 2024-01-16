# Diary Me

This project is a web application built with Node.js, Express, and Sequelize for MySQL database. It includes features for user authentication, blog creation, and deletion. The application allows users to sign up, sign in, create blog posts, view their own blogs, and delete posts.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)


## Introduction

This web application serves as a platform for users to create and manage their blogs. It provides a user-friendly interface for blog creation, authentication, and basic CRUD operations on blog posts.

## Features

- User authentication using Passport
- Secure password storage with bcrypt
- Create, read, update, and delete blog posts
- View personal blog posts on a dedicated page
- Simple and intuitive user interface

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MySQL database

### Installation

1. **Clone the repository:**

   ```
   git clone git@github.com:luayalzieny/Diary-Me.git
2. ** Direct to your preffered folder **
    cd your-folder

3. ** install dependencies **
 
### Configuration
  Configure your MySQL database details in the util/mySqlDb.js file.

`const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
});`

  Set up your session secret in app.js:

`app.use(session({
  secret: "your_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000 }
}));`

### Usage
Start the application
in terminal:
npm start
Visit http://localhost:3000 in your web browser.

Explore the features, sign up, sign in, create blog posts, and manage your blogs.
