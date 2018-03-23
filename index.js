const app =  require('./app');

app.listen('7000', app.get('port'), () => {
  console.log(`app running on port ${app.get('port')}`);
});
