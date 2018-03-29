const throng = require('throng');
const app = require('./app');

async function startWorkers() {
  await app.listen('7000', app.get('port'), () => {
    console.log(`app running on port ${app.get('port')}`);
  });
}

throng(2, startWorkers);
