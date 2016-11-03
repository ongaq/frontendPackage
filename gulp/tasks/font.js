import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });
const config = require('../config');
const path = config.paths;

// ==============================================
// iconfont
// ==============================================
/* Tasks */
gulp.task('font', () => runningFont());
// ==============================================
/* functions */
function runningFont(){
	var random = 1000;
	var op = {
		fontName: `${config.siteName}-fonts`,
		engine: 'lodash',
		runTimestamp: Math.round(Date.now() / random),
		src: `${path.font.dest}/concat/*.svg`,
		rootPath: `${path.font.rootPath}/`,
		destScssPath: `./${path.sass}/include`,
		destPath: path.font.dest,
		template: {
			scss: 'templates/iconfont/template.scss',
			html: 'templates/iconfont/template.html'
		}
	};

	return gulp.src(op.src)
	.pipe($.iconfont({
		fontName: op.fontName,
		prependUnicode: true,
		timestamp: op.runTimestamp
	})).on('glyphs', (glyphs) => {
		var consolidateOption = {
			glyphs: glyphs,
			fontName: op.fontName,
			fontPath: op.rootPath,
			className: 'icon'
		};
		gulp.src(op.template.scss)
			.pipe($.consolidate(op.engine, consolidateOption))
			.pipe($.rename({ basename: `_${op.fontName}` }))
			.pipe(gulp.dest(op.destScssPath));
		gulp.src(op.template.html)
			.pipe($.consolidate(op.engine, consolidateOption))
			.pipe($.rename({ basename: `${op.fontName}` }))
			.pipe(gulp.dest('./'));
	})
	.pipe(gulp.dest(op.destPath));
}
// ==============================================
