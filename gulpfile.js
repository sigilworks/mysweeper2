/* eslint-disable no-console */
/* eslint-disable no-process-env */

const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const del = require('del');
const webpack = require('webpack');
const path = require('path');
const runSequence = require('run-sequence');
const _ = require('lodash');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const debugGulp = require('debug')('gulp');
const config = require('config');
const fs = require('fs');

const paths = {
    build: './public',
    node_modules: './node_modules',
    fonts: './fonts',
    lib: './src/lib',
    app: './src/app',
    vendor: './src/vendor'
};

const webpackReporter = (err, stats, cb = _.noop) => {
    if (err)
        throw new gutil.PluginError('webpack', err);

    gutil.log('[webpack]', stats.toString({
        chunks: false,
        version: false,
        timings: true,
        errorDetails: true,
        colors: true
    }));

    cb();
};

gulp.task('less', function() {
    const lessEntries = ['./less/app.less'];

    return gulp.src(lessEntries)
        .pipe(plumber({ errorHandler: function(err) {
            console.log(err);
            this.emit('end');
        } }))
        .pipe(less())
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('watchLess', () => {
    gulp.watch(['./less/*.less'], ['less']);
});

gulp.task('clean', (cb) => {
    del([paths.build], cb);
});

gulp.task('statics', () => {
    return gulp.src(['./templates/*'])
               .pipe(gulp.dest('public/'));
});

gulp.task('buildAssets', ['less']);

gulp.task('build', (cb) => {
    runSequence('clean', ['buildWebpack', 'buildAssets', 'statics'], cb);
});

gulp.task('buildWebpack', (cb) => {
    process.env.BUILD_TARGET_ENV = 'development';
    const webpackConfig = require('./webpack.config');

    debugGulp('Building with: ', JSON.stringify(webpackConfig, null, 4));
    webpack(webpackConfig).run(_.partialRight(webpackReporter, cb));
});


gulp.task('watchWebpack', (cb) => {

    debugGulp(process.env.BUILD_TARGET_ENV);
    process.env.BUILD_TARGET_ENV = process.env.BUILD_TARGET_ENV || 'development';
    // redefine webpackConfig in case the env changed
    const webpackConfig = require('./webpack.config');

    webpack(webpackConfig).watch({}, _.partialRight(webpackReporter, _.once(cb)));
});


gulp.task('watch', (cb) => {
    runSequence(['buildAssets', 'statics', 'watchLess', 'watchWebpack'], cb);
});

gulp.task('lint', () => gulp.src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format()));

gulp.task('develop', () => {
    runSequence('clean', 'buildAssets', 'statics', ['watch', 'watchLess']);
});

gulp.task('default', ['develop']);

/* eslint-enable */
