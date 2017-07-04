import httpStatus from 'http-status';

const defaultResponse = (data, statusCode = httpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => ({
  error: message,
  statusCode,
});

class UsersController {

  constructor(Users) {
    this.Users = Users;
  }

  getAll() {
    return this.Users.findAll({})
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Users.findOne({ where: params })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Users.create(data)
    .then(result => defaultResponse(result, httpStatus.CREATED))
    .catch(error => errorResponse(error.message, httpStatus.UNPROSSABLE_ENTITY));
  }

  update(data, params) {
    return this.Users.update(data, { where: params })
    .then(result => defaultResponse(result))
    .catch(error => errorResponse(error.message, httpStatus.UNPROSSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({ where: params })
    .then(result => defaultResponse(result, httpStatus.NO_CONTENT))
    .catch(error => errorResponse(error.message, httpStatus.UNPROSSABLE_ENTITY));
  }
}

export default UsersController;
