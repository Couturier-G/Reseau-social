const express = require('express');
const bodyparser = require('body-parser');
const publicationsRoutes = require('./routes/publications');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');
const connect = require('./mysqlDbConnect');
const path = require('path');
const helmet = require("helmet");
const xss = require('xss-clean');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

connect.connect(function(err){
    if (err){
        console.log("Erreur de connection à la BDD Groupomania")
    }
    else {
        console.log("Connection BDD Groupomania réussie")
    }
});

app.use(xss());
app.use(helmet());
app.use(bodyparser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/publications', publicationsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;