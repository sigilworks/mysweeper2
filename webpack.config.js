/* eslint-disable prefer-arrow-callback */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


function isExternal(module) {
    const userRequest = module.userRequest;
    return _.includes(userRequest, 'node_modules');
}

const basePath = process.cwd();
const nodeModulesDir = path.join(basePath, 'node_modules');
const includePaths = _.map(['./src', './fonts', './less', './templates'], (includePath) => path.isAbsolute(includePath) ? includePath : path.resolve(path.join(basePath, includePath)));

const excludes = _(fs.readdirSync(nodeModulesDir))
    .filter(file => fs.statSync(path.join(nodeModulesDir, file)).isDirectory())
    .map(dirName => path.join(nodeModulesDir, dirName))
    .value();

const entry = {
    app: './src/app/mysweeper.js',
};


module.exports = {
    context: path.resolve(__dirname, '.'),
    entry,
    output: {
        publicPath: '/js/',
        path: path.join(basePath, 'public', 'js'),
        filename: '[name].js'
    },
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: includePaths,
                exclude: excludes
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.less$/,
                loader: 'css-loader!less-loader',
                include: includePaths
            },
            {
                test: /\.css/,
                // loader: 'css',
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                use: ExtractTextPlugin.extract({
                  use: "css-loader",
                  fallback: "style-loader"
                }),
                include: includePaths
            }
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    resolveLoader: {
        // modulesDirectories: ['node_modules'],
        // fallback: nodeModulesDir
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            actions: path.join(__dirname, 'src/app/actions'),
            components: path.join(__dirname, 'src/app/components'),
            constants: path.join(__dirname, 'src/app/constants'),
            models: path.join(__dirname, 'src/app/models'),
            helpers: path.join(__dirname, 'src/app/helpers'),
            services: path.join(__dirname, 'src/app/services'),
            store: path.join(__dirname, 'src/app/store'),
            lib: path.join(__dirname, 'src/lib')
        }
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
       /* new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),*/

        // based on an example from http://stackoverflow.com/questions/30329337/how-to-bundle-vendor-scripts-separately-and-require-them-as-needed-with-webpack/38733864#38733864
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: Object.keys(entry),
            minChunks(module) {
                return isExternal(module);
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),

        new ExtractTextPlugin('styles.css')
    ]
};

/* eslint-enable prefer-arrow-callback */

