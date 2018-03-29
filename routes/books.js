/**
 * @apiDefine ApiBooks Books Endpoints
 *
 */
const BooksController = require('../controllers/books');
module.exports = (app) => {
    const booksController = new BooksController(app.datasource.models.Books);
    app.route('/books').all(app.auth.authenticate())
        /**
         * @api {get} /books Get all Books
         * @apiPermission UserAuth
         * @apiName Get All Books
         * @apiGroup Books
         * @apiExample {curl} Example usage:
         * curl -X GET \
         *   http://localhost:7000/books \
         *   -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.B9ceD-vpW04Aoo8-avarQ6O4UYP2pEUZFqTfjtJQIc0' \
         *   -H 'Content-Type: application/json' \
         *
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * [
         *     {
         *         "id": 1,
         *         "name": "Default Book",
         *         "description": "Default Description",
         *         "createdAt": "2018-03-28T18:03:46.705Z",
         *         "updatedAt": "2018-03-28T18:03:46.705Z"
         *     },
         *     {
         *         "id": 2,
         *         "name": "Default Book",
         *         "description": "Default Description",
         *         "createdAt": "2018-03-28T18:15:30.726Z",
         *         "updatedAt": "2018-03-28T18:15:30.726Z"
         *     }
         * ]
         *
         * @apiSampleRequest http://localhost:7000/books/
         * 
         */
        .get((req, res) => {
            booksController.getAll().then((response) => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        })
        /**
         * @api {post} /books/:id Create new Books 
         * @apiPermission UserAuth
         * @apiName Create Books
         * @apiGroup Books
         * @apiExample {curl} Example usage:
         * curl -X POST http://localhost:7000/books
         *   -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.B9ceD-vpW04Aoo8-avarQ6O4UYP2pEUZFqTfjtJQIc0'
         *   -H 'Content-Type: application/json'
         *   -d '{
         *     "id": 2,
         *     "name": "Default Book",
         *     "description": "Default Description"
         * }'
         * @apiHeader {Token} Authorization Token unique access-key.
         * @apiHeader {Content-Type} Content-Type Content-Type:application/json.
         * @apiParam {Number} id Book unique ID.
         *
         * @apiSuccess {Integer} id ID of the Book.
         * @apiSuccess {String} name name Book.
         * @apiSuccess {String} description Book.
         * @apiSuccess {String} updatedAt Date update Book.
         * @apiSuccess {String} createdAt Date create Book.
         * 
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 201 OK
         *     {
         *         "id": 2,
         *          "name": "Default Book",
         *          "description": "Default Description",
         *          "updatedAt": "2018-03-28T18:15:30.726Z",
         *          "createdAt": "2018-03-28T18:15:30.726Z"
         *     }
         *
         */
        .post((req, res) => {
            booksController.create(req.body).then((response) => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        });
    app.route('/books/:id').all(app.auth.authenticate())
        /**
         * @api {get} /books/:id Get a Book
         * @apiPermission UserAuth
         * @apiName Get Book
         * @apiGroup Books
         * @apiExample {curl} Example usage:
         * curl -X GET \
         *   http://localhost:7000/books/:id \
         *   -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.B9ceD-vpW04Aoo8-avarQ6O4UYP2pEUZFqTfjtJQIc0' \
         *   -H 'Content-Type: application/json'
         *
         * @apiSuccessExample Success-Response:
         * HTTP/1.1 200 OK
         * {
         *     "id": 1,
         *     "name": "Default Book",
         *     "description": "Default Description",
         *     "createdAt": "2018-03-28T20:52:34.732Z",
         *     "updatedAt": "2018-03-28T20:52:34.732Z"
         * }
         * @apiSampleRequest http://localhost:7000/books/1
         *
         */
        .get((req, res) => {
            booksController.getById(req.params).then((response) => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        })
        /**
         * @api {put} /books/:id Update Books 
         * @apiPermission UserAuth
         * @apiName Update Books
         * @apiGroup Books
         * @apiExample {curl} Example usage:
         * curl -X POST http://localhost:7000/books/1
         *   -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.B9ceD-vpW04Aoo8-avarQ6O4UYP2pEUZFqTfjtJQIc0'
         *   -H 'Content-Type: application/json'
         *   -d '{
         *     "id": 2,
         *     "name": "Default Book Update",
         *     "description": "Default Description"
         * }'
         * @apiHeader {Token} Authorization Token unique access-key.
         * @apiHeader {Content-Type} Content-Type Content-Type:application/json.
         * @apiParam {Number} id Book unique ID.
         *
         * @apiSuccess {Integer} id ID of the Book.
         * @apiSuccess {String} name name Book.
         * @apiSuccess {String} description Book.
         * @apiSuccess {String} updatedAt Date update Book.
         * @apiSuccess {String} createdAt Date create Book.
         * 
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     [
         *          1
         *     ]
         *
         */
        .put((req, res) => {
            booksController.update(req.body, req.params).then((response) => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        })

        /**
         * @api {delete} /books/:id Delete Books
         * @apiPermission UserAuth
         * @apiName Delete a Books
         * @apiGroup Books
         * @apiExample {curl} Example usage:
         * curl -X DELETE http://localhost:7000/books/:id
         *   -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.B9ceD-vpW04Aoo8-avarQ6O4UYP2pEUZFqTfjtJQIc0'
         *   -H 'Content-Type: application/json'
         *    
         * @apiHeaderExample {json}  Headder-Exemple:
         *  {
         *     "Authorization":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.B9ceD-vpW04Aoo8-avarQ6O4UYP2pEUZFqTfjtJQIc0",
         *     "Content-Type":"application/json"  
         *  }
         *
         *
         * @apiHeader (Auth) {Token} Authorization Token unique access-key.
         * @apiHeader (Auth) {Content-Type} Content-Type Content-Type:application/json.
         * @apiParam {Number} id Book unique ID.
         * 
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 204 OK
         *
         */
        .delete((req, res) => {
            booksController.delete(req.params).then((response) => {
                res.sendStatus(response.statusCode);
            });
        });
};