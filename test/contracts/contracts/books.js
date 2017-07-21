describe('Test contracts Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
  };

  beforeEach((done) => {
    Books
        .destroy({ where: {} })
        .then(() => Books.create(defaultBook))
        .then(() => {
          done();
        });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      const booksList = Joi.array().items(
                Joi.object().keys({
                  id: Joi.number(),
                  name: Joi.string(),
                  description: Joi.string(),
                  createdAt: Joi.date().iso(),
                  updatedAt: Joi.date().iso(),
                }));

      request
            .get('/books')
            .end((err, res) => {
              joiAssert(res.body, booksList);
              done(err);
            });
    });
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
      request
            .get('/books/1')
            .end((err, res) => {
              joiAssert(res.body, book);
              done(err);
            });
    });
  });

  describe('Route POST /books', () => {
    it('should create a books', (done) => {
      const newBooks = {
        id: 2,
        name: 'Default Book',
        description: 'Default Description',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
            .post('/books')
            .send(newBooks)
            .end((err, res) => {
              joiAssert(res.body, book);
              done(err);
            });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a books', (done) => {
      const updateBooks = {
        id: 1,
        name: 'update Books',
        description: 'Default Description',
      };
      const updateCount = Joi.array().items(1);

      request
            .put('/books/1')
            .send(updateBooks)
            .end((err, res) => {
              joiAssert(res.body, updateCount);
              done(err);
            });
    });
  });


  describe('Route DELETE /books/{id}', () => {
    it('should delete a books', (done) => {
      request
            .delete('/books/1')
            .end((err, res) => {
              expect(res.statusCode).to.be.eql(204);

              done(err);
            });
    });
  });
});
