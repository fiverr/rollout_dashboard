const express = require('express');
const app = express();

app.use(express.static('./dist'));

app.get('/ping', function(req, res) {
  res.send('Pong, the time is ' + new Date())
});

app.listen(process.env.port, function () {
  console.log('listening on port ' + process.env.port)
});

