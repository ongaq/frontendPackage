import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });
const config = require('../config');
const path = config.paths;

// ==============================================
// watch
// ==============================================
/* Tasks */
gulp.task('w', ['browser-sync', 'watch']);
gulp.task('watch', () => watch());
// ==============================================
/* functions */
function watch(){
	// Sass
	$.watch(`${path.all.sass}/**/*.scss`, () => gulp.start('css:all'));

	// Uglify
	$.watch(`${path.all.js.concat}/common.js`, () => gulp.start('js:all'));

	// Sprite
	$.watch(`${path.all.image.dest}/sprites/*.png`, () => gulp.start('sprite:all'));

	// IconFont
	$.watch(`${path.font.dest}/concat/*.svg`, () => gulp.start('font'));

	// EJS
	$.watch(`${path.ejs}/**/*.ejs`, () => gulp.start('ejs:changed'));
	$.watch(`${path.ejs}/**/_*.ejs`, () => gulp.start('ejs:dev'));
}
// ==============================================
