// import webpack npm module

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            /*
            your other rules for JavaScript transpiling go in here
            */
            {
                test: /\.jsx?$/,
                use: [{ loader: 'babel-loader' }],
            },
            {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }
        ]
    }
    ,
    entry: [
        'index.jsx'
    ],
    output: {
        filename: 'app.js',
        path: __dirname + '/../dist',
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].bundle.css',
            allChunks: true,
        }),
    ],
};