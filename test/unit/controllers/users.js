import UsersControllers from '../../../controllers/users';

describe('Test Unit Users', () => {
  describe('Get all users: getAll()', () => {
    it('should return a list users', () => {
      const Users = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'getAll Users',
        email: 'test@test.com.br',
        password: 'teste',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      }];

      td.when(Users.findAll({})).thenResolve(expectedResponse);

      const usersControllers = new UsersControllers(Users);

      return usersControllers.getAll()
            .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a users: getID()', () => {
    it('should return a users', () => {
      const Users = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'getID Users',
        email: 'test@test.com.br',
        password: 'teste',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const usersControllers = new UsersControllers(Users);

      return usersControllers.getById({ id: 1 })
            .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a users: create()', () => {
    it('should create a users', () => {
      const Users = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Create Users',
      };

      const expectedResponse = {
        id: 1,
        name: 'Create Users',
        email: 'test@test.com.br',
        password: 'teste',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      td.when(Users.create(requestBody)).thenResolve(expectedResponse);

      const usersControllers = new UsersControllers(Users);

      return usersControllers.create(requestBody)
            .then((response) => {
              expect(response.statusCode).to.be.eql(201);
              expect(response.data).to.be.eql(expectedResponse);
            });
    });
  });


  describe('Update a users: update()', () => {
    it('should update a  users', () => {
      const Users = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Update Users',
        email: 'test1@test.com.br',
        password: 'teste1',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      const expectedResponse = {
        id: 1,
        name: 'Update Users',
        email: 'test1@test.com.br',
        password: 'teste1',
        created_at: '2016-10-13 17:43:21.879',
        updated_at: '2016-10-13 17:43:21.879',
      };

      td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const usersControllers = new UsersControllers(Users);

      return usersControllers.update(requestBody, { id: 1 })
            .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });


  describe('Delete a users: delete()', () => {
    it('should delete a  users', () => {
      const Users = {
        destroy: td.function(),
      };

      td.when(Users.destroy({ where: { id: 1 } })).thenResolve({});

      const usersControllers = new UsersControllers(Users);

      return usersControllers.delete({ id: 1 })
            .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
