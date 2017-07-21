import express from 'express';
import bodyParse from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouters from './routes/books';
import usersRouters from './routes/users';

const app = express();
app.config = config;
app.use(bodyParse.json());
app.datasource = datasource(app);

app.set('port', 7000);

booksRouters(app);
usersRouters(app);

export default app;
