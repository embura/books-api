import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default app => {

	const config = app.config;
	const Users = app.datasource.models.Users;

	app.post('/token', (req, res) =>{

		if(!req.body.email || !req.body.password){
			res.sendStatus(HttpStatus.UNATHORIZED);
		}

		const email  = req.body.email;
		const password = req.body.password;

		Users.findOne({where:{email}})
		.then(user =>{

			if(Users.isPassword(user.password, password)){

				const payload = { id: user.id};
				console.log('teste 3');

				res.json({
					token: jwt.encode(payload, config.jwtSecret)
				});
				return;
			}else{

				console.log('teste 4');

				res.sendStatus(HttpStatus.UNATHORIZED);
			}
		}).catch(err => {

			console.error('\n\nerr: ', err);


			console.log('teste 5');
			res.sendStatus(HttpStatus.UNATHORIZED);
		});
	});
}