const jwt = require('jwt-simple');

describe('Test contracts Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  let token = '';

  const defaultUser = {
    id: 2,
    name: 'Default User',
    email: 'teste@teste.com.br',
    password: '12345678',
  };

  beforeEach((done) => {
    Users.destroy({ where: {} })
    .then(() => Users.create({
      id: 1,
      name: 'John',
      email: 'embura@mail.com',
      password: '123456',
    }))
    .then((user) => {
      Users.create(defaultUser)
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      const usersList = Joi.array().items(
        Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string().email(),
          password: Joi.string(),
          createdAt: Joi.date().iso(),
          updatedAt: Joi.date().iso(),
        }));

      request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        joiAssert(res.body, usersList);
        done(err);
      });
    });
  });


  describe('Route GET /users/{id}', () => {
    it('should return a users', (done) => {
      const users = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
      request
      .get('/users/2')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        joiAssert(res.body, users);
        done(err);
      });
    });
  });

  describe('Route POST /users', () => {
    it('should create a users', (done) => {
      const newUsers = {
        id: 3,
        name: 'Create Users',
        email: 'teste@gmail.com',
        password: '12345678',
      };

      const users = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .send(newUsers)
      .end((err, res) => {
        joiAssert(res.body, users);
        done(err);
      });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a users', (done) => {
      const updateUsers = {
        id: 2,
        name: 'update Users',
      };

      const updateCount = Joi.array().items(1);
      request
      .put('/users/2')
      .set('Authorization', `JWT ${token}`)
      .send(updateUsers)
      .end((err, res) => {
        joiAssert(res.body, updateCount);
        done(err);
      });
    });
  });


  describe('Route DELETE /users/{id}', () => {
    it('should delete a users', (done) => {
      request
      .delete('/users/2')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);

        done(err);
      });
    });
  });
});
