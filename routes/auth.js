const HttpStatus = require('http-status');
const jwt = require('jwt-simple');

module.exports =  (app) => {
  const config = app.config;
  const Users = app.datasource.models.Users;

  app.post('/token', (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ where: { email } })
    .then((user) => {
      if (Users.isPassword(user.password, password)) {
        const payload = { id: user.id };

        res.json({
          token: jwt.encode(payload, config.jwtSecret),
        });
        return;
      }
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }).catch(() => {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    });
  });
};
