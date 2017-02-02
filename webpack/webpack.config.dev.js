const host = 'localhost';
const port = '4444';
const webpack = require('webpack')
const path = require('path');
const distPath = path.join(__dirname,'/../','dist' );
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        'webpack-hot-middleware/client?path=http://localhost:4444/__webpack_hmr',
        "./src/index.js"
    ],
    output: {
        path: distPath,
        filename: "bundle.js",
        publicPath: 'http://' + host + ':' + port + "/"
    },
    plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CopyWebpackPlugin([{
             from: './assets', to: distPath
            }]),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot','babel-loader'],
                include: path.join(__dirname, '../','src')
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};