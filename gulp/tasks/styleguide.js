import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });

// ==============================================
// Style Guide
// ==============================================
/* Tasks */
gulp.task('aigis', () => {
	return gulp.src('./aigis_config.yml').pipe($.aigis());
});
// ==============================================
