var gulp = require('gulp'),
    run = require('gulp-run'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    filesToLint = [
        'app/**/*.js',
        '!app/node_modules/**/*.js',
        '!app/tns_modules/**/*.js'
    ];

gulp.task('build', function () {
    return run('tns build android').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('watch', function () {
    return run('tns livesync --watch').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('emulator', function () {
    return run('tns run android --emulator').exec()
        .pipe(gulp.dest('output'));
});

gulp.task("jshint", function () {
    return gulp.src(filesToLint)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('jscs', function () {
    gulp.src(filesToLint)
        .pipe(jscs());
});

gulp.task('lint', ['jshint', 'jscs']);


