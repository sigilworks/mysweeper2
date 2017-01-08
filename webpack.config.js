/* eslint-disable prefer-arrow-callback */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');


function isExternal(module) {
    const userRequest = module.userRequest;
    return _.includes(userRequest, 'node_modules');
}

const basePath = process.cwd();
const nodeModulesDir = path.join(basePath, 'node_modules');
const includePaths = _.map(['./src'], (includePath) => path.isAbsolute(includePath) ? includePath :path.resolve(path.join(basePath, includePath)));

const excludes = _(fs.readdirSync(nodeModulesDir))
    .filter(file => fs.statSync(path.join(nodeModulesDir, file)).isDirectory())
    .map(dirName => path.join(nodeModulesDir, dirName))
    .value();

const entry = {
    app: './src/app/mysweeper.js',
};

console.log('basePath: %j', basePath);


module.exports = {
    context: path.resolve(__dirname, '.'),
    entry,
    output: {
        publicPath: '/js/',
        path: path.join(basePath, 'public', 'js'),
        filename: '[name].js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: includePaths,
                exclude: excludes
            },
            {
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.less$/,
                loader: 'css!less',
                include: includePaths
            },
            {
                test: /\.css/,
                loader: 'css',
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
        modulesDirectories: ['node_modules'],
        fallback: nodeModulesDir
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        root: nodeModulesDir,
        alias: {
            actions: path.join(__dirname, 'src/app/actions'),
            constants: path.join(__dirname, 'src/app/constants'),
            models: path.join(__dirname, 'src/app/models'),
            helpers: path.join(__dirname, 'src/app/helpers'),
            services: path.join(__dirname, 'src/app/services'),
            store: path.join(__dirname, 'src/app/store'),
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),

        // based on an example from http://stackoverflow.com/questions/30329337/how-to-bundle-vendor-scripts-separately-and-require-them-as-needed-with-webpack/38733864#38733864
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: Object.keys(entry).concat(['forms']),
            minChunks(module) {
                return isExternal(module);
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })

    ]
};

/* eslint-enable prefer-arrow-callback */

