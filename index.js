const throng = require('throng');
const app = require('./app');

async function startWorkers() {

  // TODO: Teste
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'teste@teste.com.br',
    password: '12345678',
  };
  const Users = await app.datasource.models.Users;
  Users.findOne({ 
    where: {
      id: defaultUser.id,
      name: defaultUser.name,
      email: defaultUser.email
      }
    }).then(async (user) =>{

      if(!user){
        await Users.create(defaultUser);
        console.log('\n\nCriado novo usuário: ', user);
      }else{
        console.error('\n\nUsuario já existe: ', user.dataValues);
      }
  }).catch(err => {
    console.error('\n\nError ao criar usuário: ', err.message);
  });

  await app.listen('7000', app.get('port'), () => {
    console.log(`app running on port ${app.get('port')}`);
  });
}

throng(2, startWorkers);
