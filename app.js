const express = require('express');
const app = express();

app.use(express.static('./dist'));


app.listen(process.env.ROLLOUT_PORT, function () {
  console.log('listening on port ' + process.env.ROLLOUT_PORT)
});

