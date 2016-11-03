import gulp from 'gulp';

const del = require('del');
const config = require('../config');
const path = config.paths;
const $ = require('gulp-load-plugins')({ pattern: '*' });
const meta = require(`${config.root}/meta.json`);

// ==============================================
// sass
// ==============================================
/* Tasks */
gulp.task('ejs', () => runningEJS('prod'));
gulp.task('ejs:prod', () => runningEJS('prod'));
gulp.task('ejs:dev', () => runningEJS('dev'));
gulp.task('ejs:changed', () => runningEJS('dev', 'changed'));
// ==============================================
/* functions */
function runningEJS(_state, _changed = null){
	const dest = `${config.root}/source`;
	let json = {
		env: {
			root: `${config.root}/${path.ejs}`,
			meta: meta
		}
	};

	gulp.src([`${path.ejs}/**/*.ejs`, `!${path.ejs}/**/_*.ejs`])
	.pipe($.plumber())
	.pipe($.if(_changed === 'changed', $.changed(dest, { extension: '.html' })))
	.pipe($.ejs(json, { ext: '.html' }))
	.pipe(gulp.dest(dest))
	.pipe($.browserSync.reload({ stream: true }));

	// sourceフォルダ配下にejsファイル、コピーファイルが出来たら削除する
	del('./source/**/*.ejs');
	del('./source/**/*コピー.html');
}
// ==============================================
