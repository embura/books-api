const BooksControllers = require('../../../controllers/books');

describe('Unit Controller: Books ', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'getAll Books',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksControllers = new BooksControllers(Books);

      return booksControllers.getAll()
            .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a books: getID()', () => {
    it('should return a books', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'getID Books',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksControllers = new BooksControllers(Books);

      return booksControllers.getById({ id: 1 })
            .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a books: create()', () => {
    it('should create a books', () => {
      const Books = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Create Books',
      };

      const expectedResponse = {
        id: 1,
        name: 'Create Books',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksControllers = new BooksControllers(Books);

      return booksControllers.create(requestBody)
            .then((response) => {
              expect(response.statusCode).to.be.eql(201);
              expect(response.data).to.be.eql(expectedResponse);
            });
    });
  });


  describe('Update a books: update()', () => {
    it('should update a  books', () => {
      const Books = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Update Books',
      };

      const expectedResponse = {
        id: 1,
        name: 'Update Books',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksControllers = new BooksControllers(Books);

      return booksControllers.update(requestBody, { id: 1 })
            .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });


  describe('Delete a books: delete()', () => {
    it('should delete a  books', () => {
      const Books = {
        destroy: td.function(),
      };


      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});

      const booksControllers = new BooksControllers(Books);

      return booksControllers.delete({ id: 1 })
            .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
