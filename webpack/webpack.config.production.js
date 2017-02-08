const webpack = require('webpack');
const path = require('path');
const distPath = path.join(__dirname, '/../', 'dist' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config/app');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: __dirname+ '/..',
    progress: true,
    entry: [
        "./src/index.js"
    ],
    output: {
        path: distPath,
        filename: "bundle.js"
    },
        plugins: [
            new CopyWebpackPlugin([{
                from: './assets', to: distPath
            }]),
            function(){
                this.plugin("done", function(stats)
                {
                    if (stats.compilation.errors && stats.compilation.errors.length)
                    {
                        console.log(stats.compilation.errors);
                        process.exit(1);
                    }
                });
             },
            new webpack.DefinePlugin({
                'ROLLOUT_SERVICE_HOST': JSON.stringify(config.rolloutServiceHost),
                'ROLLOUT_SERVICE_PORT': JSON.stringify(config.rolloutServicePort)
            }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, '../','src')
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};