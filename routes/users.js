import UsersController from '../controllers/users';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.Users);


/**
 * @api {get} /users List all users
 * @apiGroup Users
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
  app.route('/users')
    .get((req, res) => {
      usersController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      usersController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/users/:id')
    .get((req, res) => {
      usersController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      usersController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      usersController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
