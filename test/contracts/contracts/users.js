describe('Test contracts Users', () => {
	const Users = app.datasource.models.Users;
	const defaultUser = {
		id: 1,
		name: 'Default Users',
		email: 'teste@gmail.com',
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
			.end((err, res) => {

				console.log('[DEBUG] res.body LIST: ', res.body[0]);
				console.log('[DEBUG]usersList LIST: ', usersList[0]);

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
			.get('/users/1')
			.end((err, res) => {
				joiAssert(res.body, users);
				done(err);
			});
		});
	});

	describe('Route POST /users', () => {
		it('should create a users', (done) => {
			const newUsers = {
				id: 2,
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
				id: 1,
				name: 'update Users',
			};
			const updateCount = Joi.array().items(1);

			request
			.put('/users/1')
			.send(updateUsers)
			.end((err, res) => {
				joiAssert(res.bady, updateCount);
				done(err);
			});
		});
	});


	describe('Route DELETE /users/{id}', () => {
		it('should delete a users', (done) => {
			request
			.delete('/users/1')
			.end((err, res) => {
				expect(res.statusCode).to.be.eql(204);

				done(err);
			});
		});
	});
});
