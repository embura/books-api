<<<<<<< HEAD
describe('Integration Routes Users ', () => {
  const Users = app.datasource.models.Users;
  const defaultBook = {
    id: 1,
    name: 'Default Users',
    email: 'test@email.com',
    password: 'test',
  };

  beforeEach((done) => {
    Users
    .destroy({ where: {} })
    .then(() => Users.create(defaultBook))
    .then(() => {
      done();
    });
  });

  describe('Route GET /users', () => {
    it('should return a list of user', (done) => {
      request
      .get('/users')
      .end((err, res) => {
        expect(res.body[0].id).to.be.eql(defaultBook.id);
        expect(res.body[0].name).to.be.eql(defaultBook.name);
        expect(res.body[0].email).to.be.eql(defaultBook.email);

        done(err);
      });
    });
  });


  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
      .get('/users/1')
      .end((err, res) => {
        expect(res.body.id).to.be.eql(defaultBook.id);
        expect(res.body.name).to.be.eql(defaultBook.name);
        expect(res.body.email).to.be.eql(defaultBook.email);

        done(err);
      });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newBook = {
        id: 1,
        name: 'Create Book',
        email: 'newEmail@email.com',
        password: 'teste',
      };
      request
    .post('/users')
    .send(newBook)
    .end((err, res) => {
      console.log('res.body', res.body);
      expect(res.body.id).to.be.eql(newBook.id);
      expect(res.body.name).to.be.eql(newBook.name);
      expect(res.body.email).to.be.eql(newBook.email);

      done(err);
    });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updateBook = {
        id: 1,
        name: 'update Book',
        email: 'update@email.com',
      };

      request
    .put('/users/1')
    .send(updateBook)
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
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);

        done(err);
      });
    });
  });
});
=======
describe('Test Integration Users', () => {
    const Users = app.datasource.models.Users;
    const defaultUser = {
        id: 1,
        name: 'Default User',
        email: 'teste@teste.com.br',
        password: '12345678',
    };

    beforeEach((done) => {
        Users
        .destroy({ where: {} })
        .then(() => Users.create(defaultUser))
        .then(() => {
            done();
        });
    });

    describe('Route GET /users', () => {
        it('should return a user', (done) => {
            request
            .get('/users')
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
                id: 2,
                name: 'Create User',
                email: "test@test.com.br",
                password: "test",
            };
            request
            .post('/users')
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
            .end((err, res) => {
                expect(res.statusCode).to.be.eql(204);

                done(err);
            });
        });
    });
});
>>>>>>> 5641bcc742438fbabe016f0ec28fcb96a8ac08d4
