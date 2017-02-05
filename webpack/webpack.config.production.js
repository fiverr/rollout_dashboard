const webpack = require('webpack');
const path = require('path');
const distPath = path.join(__dirname, '/../', 'dist' );
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
                'ROLLOUT_HOST': JSON.stringify(process.env.ROLLOUT_HOST),
                'ROLLOUT_PORT': JSON.stringify(process.env.ROLLOUT_PORT)
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