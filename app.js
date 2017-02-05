const express = require('express');
const app = express();

app.use(express.static('./dist'));


app.listen(process.env.port, function () {
  console.log('listening on port ' + process.env.port)
});

