import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const config = app.config;
  const Users = app.datasource.models.Users;

  app.post('/token', (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.sendStatus(HttpStatus.UNATHORIZED);
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
      res.sendStatus(HttpStatus.UNATHORIZED);
    }).catch(() => {
      res.sendStatus(HttpStatus.UNATHORIZED);
    });
  });
};
