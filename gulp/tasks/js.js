import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });
const config = require('../config');
const uglify = require('../uglify');
const pkg = require(`${config.root}/package.json`);
const onError = (err) => {
	return $.notify.onError({
		message: `Error: ${err}`,
		title: 'Error running something',
		logLevel: 1,
		onLast: true,
		icon: `${config.root}/node_modules/gulp-notify/assets/gulp-error.png`
	});
};
// ==============================================
// uglifyjs
// ==============================================
/* Tasks */
gulp.task('js', ['js:all']);
gulp.task('js:all', () => runningJS(uglify.all));
// ==============================================
/* functions */
function runningJS(_createFiles){
	var date = new Date();
	var files = _createFiles;

	if(files.babel === null) {
		return fnImport(files);
	} else {
		return $.mergeStream(fnBabel(files), fnImport(files));
	}

	function fnBabel(item){
		return gulp.src(item.babel.target)
		.pipe($.plumber({ errorHandler: onError }))
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe($.concat(item.babel.fileName))
		.pipe(gulp.dest(item.babel.dest));
		// .pipe($.browserSync.reload({ stream: true }));
	}
	function fnImport(item){
		var banner = `/*!\n * <%= pkg.name %> - ${item.destFile}\n * @generated ${date}\n */\n`;
		var message = config.options.notify.uglify.message;
		message += ` -> ${item.name}(${item.destFile})`;

		return gulp.src(item.concat)
		.pipe($.plumber({ errorHandler: onError }))
		.pipe($.concat(item.destFile))
		.pipe($.header(banner, { pkg:pkg }))
		.pipe($.sourcemaps.init())
			.pipe($.uglify({ preserveComments: 'some' }))
		.pipe($.sourcemaps.write('./'))
		.pipe($.notify(message))
		.pipe(gulp.dest(item.destPath))
		.pipe($.browserSync.reload({ stream: true }));
	}
}
// ==============================================
