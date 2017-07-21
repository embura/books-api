import express from 'express';
import bodyParse from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authotization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);
const auth = authotization(app);

app.set('port', 7000);
app.use(bodyParse.json());
app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
