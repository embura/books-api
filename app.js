const express = require('express');
const bodyParse = require('body-parser');
const consign = require('consign');
const config = require('./config/config');
const datasource = require('./config/datasource');
const authotization = require('./auth');

const app = express();
app.config = config;
app.datasource = datasource(app);
const auth = authotization(app);
app.set('port', 7000);
app.use(bodyParse.json());
app.use(auth.initialize());
app.auth = auth;

consign()
	.then('routes')
	.into(app, async (err) => {
  		if (err) throw err;
});

module.exports = app;
