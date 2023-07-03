const gulp       = require('gulp');
const concat     = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify     = require('gulp-uglify');



var conf = {
    dist: "./dist",
    js: {
        fileMin: 'coreui-layout.min.js',
        file: 'coreui-layout.js',
        src: [
            'src/js/coreui.layout.js',
            'src/js/coreui.layout.instance.js',
        ]
    }
};



gulp.task('build_js_min', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(conf.js.fileMin, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_min_fast', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.js.fileMin, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js', function() {
    return gulp.src(conf.js.src)
        .pipe(concat(conf.js.file, {newLine: ";\n"}))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_watch', function() {
    gulp.watch(conf.js.src, gulp.parallel(['build_js_min_fast']));
});

gulp.task("default", gulp.series(['build_js_min', 'build_js']));