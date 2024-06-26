const gulp             = require('gulp');
const concat           = require('gulp-concat');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const sass             = require('gulp-sass')(require('sass'));
const rollup           = require('@rollup/stream');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const rollupBabel      = require('@rollup/plugin-babel');
const source           = require('vinyl-source-stream');
const buffer           = require("vinyl-buffer");


var conf = {
    dist: "./dist",
    js: {
        fileMin: 'coreui-layout.min.js',
        file: 'coreui-layout.js',
        main: 'src/js/main.js',
        src: 'src/js/**/*.js'
    },
    css_bootstrap: {
        fileMin: 'coreui.layout.bootstrap.min.css',
        main: 'src/css/coreui.layout.bootstrap.scss',
    }
};



gulp.task('build_js', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: false,
            format: 'umd',
            name: "CoreUI.layout"
        },
        context: "window",
        plugins: [
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.file))
        .pipe(buffer())
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_min_fast', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: false,
            format: 'umd',
            name: "CoreUI.layout"
        },
        context: "window",
        plugins: [
            rollupSourcemaps(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.fileMin))
        .pipe(buffer())
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_min', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: false,
            format: 'umd',
            name: "CoreUI.layout"
        },
        context: "window",
        plugins: [
            rollupSourcemaps(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.fileMin))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_bootstrap', function() {
    return gulp.src(conf.css_bootstrap.main)
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['node_modules'], outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat(conf.css_bootstrap.fileMin))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_watch', function() {
    gulp.watch(conf.js.src, gulp.parallel(['build_js_min_fast']));
});

gulp.task("default", gulp.series(['build_js_min', 'build_js']));