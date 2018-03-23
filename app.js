const express = require('express');
const bodyParse = require('body-parser');
const load = require('express-load');
const config = require('./config/config');
const datasource = require('./config/datasource');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authotization = require('./auth');
const app = express();
app.config = config;
app.datasource = datasource(app);
const auth = authotization(app);
app.set('port', 7000);
app.use(bodyParse.json());
app.use(auth.initialize());
app.auth = auth;


load('routes')
	.into(app, async (err, instance) => {

    if (err) throw err;
    
    module.exports = app;
});