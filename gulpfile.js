const gulp = require('gulp');
const path = require('path');

function copyIcons() {
	return gulp.src('src/**/*.svg').pipe(gulp.dest('dist'));
}

exports.default = copyIcons;
