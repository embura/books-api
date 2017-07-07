import express from 'express';
import bodyParse from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouters from './routes/books';
import usersRouters from './routes/users';
import authRouter from './routes/auth';
import authorization from './auth';


const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParse.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;


booksRouters(app);
usersRouters(app);
authRouter(app);


export default app;
