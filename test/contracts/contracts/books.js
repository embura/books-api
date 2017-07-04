<<<<<<< HEAD
describe('Conracts Routes Books ', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
  };
=======
describe('Test contracts Books', () => {
>>>>>>> 5641bcc742438fbabe016f0ec28fcb96a8ac08d4

    const Books = app.datasource.models.Books;
    const defaultBook = {
        id: 1,
        name: 'Default Book',
    };

    beforeEach((done) => {
        Books
        .destroy({ where: {} })
        .then(() => Books.create(defaultBook))
        .then(() => {
            done();
        });
    });

<<<<<<< HEAD
  describe('Route GET /books', () => {
    it('should return a list of book', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));
=======
    describe('Route GET /books', () => {
        it('should return a list of book', (done) => {
            const booksList = Joi.array().items(Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                createdAt: Joi.date().iso(),
                updatedAt: Joi.date().iso(),
            }));
>>>>>>> 5641bcc742438fbabe016f0ec28fcb96a8ac08d4

            request
            .get('/books')
            .end((err, res) => {
                joiAssert(res.body, booksList);
                done(err);
            });
        });
    });
<<<<<<< HEAD
  });


  describe('Route GET /books/{id}', () => {
    it('should return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
=======
>>>>>>> 5641bcc742438fbabe016f0ec28fcb96a8ac08d4

    describe('Route GET /books/{id}', () => {
        it('should return a book', (done) => {
            const book = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                createdAt: Joi.date().iso(),
                updatedAt: Joi.date().iso(),
            });

            request
            .get('/books/1')
            .end((err, res) => {
                joiAssert(res.body, book);
                done(err);
            });
        });
    });

<<<<<<< HEAD
  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'Create Book',
        description: 'new Book',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
=======
    describe('Route POST /books', () => {
        it('should create a book', (done) => {
            const newBook = {
                id: 2,
                name: 'Create Book',
            };

            const book = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                createdAt: Joi.date().iso(),
                updatedAt: Joi.date().iso(),
            });
>>>>>>> 5641bcc742438fbabe016f0ec28fcb96a8ac08d4

            request
            .post('/books')
            .send(newBook)
            .end((err, res) => {
                joiAssert(res.body, book);
                done(err);
            });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('should update a book', (done) => {
            const updateBook = {
                id: 1,
                name: 'update Book',
            };
            const updateCount = Joi.array().items(1);

            request
            .put('/books/1')
            .send(updateBook)
            .end((err, res) => {
                joiAssert(res.bady, updateCount);
                done(err);
            });
        });
    });


    describe('Route DELETE /books/{id}', () => {
        it('should delete a book', (done) => {
            request
            .delete('/books/1')
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(204);

                done(err);
            });
        });
    });
});
