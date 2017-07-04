import express from 'express';
import bodyParse from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouters from './routes/books';
import usersRouters from './routes/users';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParse.json());
app.use(express.static("public"));


/**
 * @api {get} /signin Singin
 * @apiGroup Sistema
 *
 * @apiSuccess {String} status Mensagem de acesso autorizado
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "Logado!"
 *    }
 *
 */
booksRouters(app);

/**
 * @api {post} /signup Signup
 * @apiGroup Sistema
 *
 * @apiSuccess {String} status Mensagem de cadastro efetuado
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "Cadastrado!"
 *    }
 *
 */
usersRouters(app);

export default app;
