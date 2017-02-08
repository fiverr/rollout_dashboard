const express = require('express');
const app = express();
const config = require('./config/app');

app.use(express.static('./dist'));

app.get('/ping', function(req, res) {
  res.send('Pong, the time is ' + new Date())
});

app.listen(config.port, function () {
  console.log('listening on port ' + config.port)
});

