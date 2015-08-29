var gulp = require('gulp'),
    run = require('gulp-run'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    filesToLint = [
        'app/**/*.js',
        '!app/node_modules/**/*.js',
        '!app/tns_modules/**/*.js'
    ];

// json-server Task
gulp.task('server', function() {
    return run('json-server resources/_db.json --watch -p 6666 -d 666').exec()
        .pipe(gulp.dest('output'));
});

// {N} Tasks
gulp.task('build', function () {
    return run('tns build android').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('sync', function () {
    return run('tns livesync').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('_watch', function () {
    return run('tns livesync --watch').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('_emulator', function () {
    return run('tns run android --emulator').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('_run', function () {
    return run('tns run android').exec()
        .pipe(gulp.dest('output'));
});

// Lint Tasks
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

// development tasks
gulp.task('emulator', ['server', '_emulator']);

gulp.task('run', ['server', '_run']);

gulp.task('watch', ['server', '_watch']);

