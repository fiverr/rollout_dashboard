const webpack = require('webpack')
const path = require('path');
const distPath = path.join(__dirname,'/../','dist' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config/app');

module.exports = {
    devtool: 'source-map',
    context: __dirname+ '/..',
    progress: true,
    devServer: {
          headers: { "Access-Control-Allow-Origin": "*" },
          outputPath: path.join(__dirname, 'dist'),
          hot: true
    },
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:' + config.port +'/__webpack_hmr',
        "./src/index.js"
    ],
    output: {
        path: distPath,
        filename: "bundle.js",
        publicPath: 'http://localhost:' + config.port + "/"
    },
    plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CopyWebpackPlugin([{
             from: './assets', to: distPath
            }]),
            new webpack.DefinePlugin({
                'ROLLOUT_SERVICE_HOST': JSON.stringify(config.rolloutServiceHost),
                'ROLLOUT_SERVICE_PORT': JSON.stringify(config.rolloutServicePort),
                'GOOGLE_AUTH_API_KEY': JSON.stringify(config.googleAuth.apiKey),
                'GOOGLE_AUTH_CLIENT_ID': JSON.stringify(config.googleAuth.clientId)
            }),
    ],
    module: {
        loaders: [
            { 
                 test: /\.tsx|\.ts?$/, loader: "awesome-typescript-loader" ,
                  include: path.join(__dirname, '../','src')   
            },
            { 
                 test: /\.js|\.jsx?$/,
                  loaders: ['react-hot','babel-loader'],
                  include: path.join(__dirname, '../','src')   
            },
            {
                test: /\.scss|\.css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};