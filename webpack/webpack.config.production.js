const webpack = require('webpack');
const path = require('path');
const distPath = path.join(__dirname, '/../', 'dist' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config/app');

module.exports = {
    devtool: 'source-map',
    context: __dirname+ '/..',
    progress: true,
    entry: [
        "./src/index"
    ],
    output: {
        path: distPath,
        filename: "bundle.js"
    },
        plugins:[
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
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
                'ROLLOUT_SERVICE_PORT': JSON.stringify(config.rolloutServicePort),
                'GOOGLE_AUTH_CLIENT_ID': JSON.stringify(config.googleAuth.clientId),
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
    ],
    resolve: {
        extensions: ['','.ts', '.tsx', '.js'] 
    },
    module: {
        loaders: [
            { 
                  test: /\.tsx|\.ts?$/, loader: "ts-loader" ,
                  include: path.join(__dirname, '../','src')   
            },
            {
                test: /\.scss|\.css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};