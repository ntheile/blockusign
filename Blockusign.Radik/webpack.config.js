var path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './build/index.js',
    target: "node",
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
          test: /\.js$/, // include .js files
          enforce: "pre", // preload the jshint loader
          exclude: /node_modules/, // exclude any and all files in the node_modules folder
       }]
    }
}