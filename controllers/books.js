const httpStatus = require('http-status');

const defaultResponse = (data, statusCode = httpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => ({
  error: message,
  statusCode,
});

module.exports = class BooksController {

  constructor(Books) {
    this.Books = Books;
  }

  static instance(Books) {
    return new BooksController(Books);
  }

  getAll() {
    return this.Books.findAll({})
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Books.findOne({ where: params })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Books.create(data)
    .then(result => defaultResponse(result, httpStatus.CREATED))
    .catch(error => errorResponse(error.message, httpStatus.UNPROSSABLE_ENTITY));
  }

  update(data, params) {
    return this.Books.update(data, { where: params })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, httpStatus.UNPROSSABLE_ENTITY));
  }

  delete(params) {
    return this.Books.destroy({ where: params })
    .then(result => defaultResponse(result, httpStatus.NO_CONTENT))
    .catch(error => errorResponse(error.message, httpStatus.UNPROSSABLE_ENTITY));
  }
};
