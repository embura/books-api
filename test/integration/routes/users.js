import jwt from 'jwt-simple';

describe('Test Integration Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  let token = '';

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'teste@teste.com.br',
    password: '12345678',
  };

  beforeEach((done) => {
    Users.destroy({ where: {} })
    .then(() => Users.create({
      id: 2,
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
    it('should return a user', (done) => {
      request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {

        expect(res.body[0].id).to.be.eql(defaultUser.id);
        expect(res.body[0].name).to.be.eql(defaultUser.name);

        done(err);
      });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
      .get('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {

        expect(res.body.id).to.be.eql(defaultUser.id);
        expect(res.body.name).to.be.eql(defaultUser.name);
        expect(res.body.email).to.be.eql(defaultUser.email);

        done(err);
      });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 3,
        name: 'Create User',
        email: 'test@test.com.br',
        password: 'test',
      };
      request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .send(newUser)
      .end((err, res) => {
        expect(newUser.id).to.be.eql(res.body.id);
        expect(newUser.name).to.be.eql(res.body.name);
        expect(newUser.email).to.be.eql(res.body.email);

        done(err);
      });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updateUser = {
        id: 1,
        name: 'update User',
      };

      request
      .put('/users/1')
      .set('Authorization', `JWT ${token}`)
      .send(updateUser)
      .end((err, res) => {
        expect(res.body).to.be.eql([1]);

        done(err);
      });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
      .delete('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);
        done(err);
      });
    });
  });
});
