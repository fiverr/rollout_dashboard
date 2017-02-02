const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
noInfo: true,  
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4444, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:4444/');
}
)