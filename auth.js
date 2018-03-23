const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');


module.exports =(app) => {
  const Users = app.datasource.models.Users;
  const opts = {};

  opts.secretOrKey = app.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email,
        });
      }
      return done(null, false);
    }).catch(err => done(err, null));
  });


  passport.use(strategy);


  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession),
  };
};
