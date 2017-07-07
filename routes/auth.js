import HttpStatus from 'http-status';
import jwt from 'jwt-simple';


export default(app) => {


	const config = app.config;
	const Users = app.datasource.models.Users;


	app.post('/token', (req, res) =>{

		const email = req.body.email;
		const password = req.body.password;

		if(email && password){


			Users.findOne({ where:email }).then(user => {				
				console.log("User: ", user.name);
				console.log("User: ", user.email);
			});


/*			Users.findOne({ where : email })
			.then(user => {

				console.log("user.password: ", user.password);
				console.log("password: ", password);				

				if(user.isPassword(user.password, password)){
					const payload = { id:user.id};
					
					res.json({
						token:jwt.encode(payload, config.jwtSecret)
					});

				}else{
					res.sendStatus(HttpStatus.UNAUTHORIZED);
				}
			}).catch( err => {

				console.log("Error: ", err);

				res.sendStatus(HttpStatus.UNAUTHORIZED) 

			});*/

		}else{
			res.sendStatus(HttpStatus.UNAUTHORIZED);
		}
	});
}