import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });
const config = require('../config');
const path = config.paths;

// ==============================================
// browser-sync
// ==============================================
/* Tasks */
gulp.task('browser-sync', browserSync);
gulp.task('reload', () => $.browserSync.reload());
// ==============================================
/* functions */
function browserSync(){
	return $.browserSync.init({
		port: path.browserSync.port,
		proxy: path.browserSync.proxy,
		watchTask: true,
		notify: false,
		ghostMode: false,
		watchOptions: {
			ignoreInitial: true,
			ignored: './node_modules/'
		}
	});
}
// ==============================================
