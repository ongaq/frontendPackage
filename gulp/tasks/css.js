import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });
const config = require('../config');
const path = config.paths;

// ==============================================
// sass
// ==============================================
/* Tasks */
gulp.task('css', ['css:all']);
gulp.task('css:all', () => runningSass(path.all.sass, path.all.css));
// ==============================================
/* functions */
function runningSass(_sass, _css){
	const pathSass = `${_sass}/*.scss`;

	return gulp.src(pathSass)
	.pipe($.plumber({ errorHandler: $.notify.onError('<%= error.message %>') }))
	.pipe($.sass(config.options.libsass))
	.pipe($.pleeease(config.options.pleeease))
	.pipe($.notify(config.options.notify.css))
	.pipe(gulp.dest(_css))
	.pipe($.browserSync.reload({ stream: true }));
}
// ==============================================
