import gulp from 'gulp';

const $ = require('gulp-load-plugins')({ pattern: '*' });
const config = require('../config');
const path = config.paths;

// ==============================================
// spritesmith
// ==============================================
/* Tasks */
gulp.task('sprite', ['sprite:all']);
gulp.task('sprite:all', () => runningSprite(path.all.image.dest, path.all.image.rootPath, path.all.sass));
// ==============================================
/* functions */
function runningSprite(_destPath, _imagePath, _destIncludePath){
	var spriteData = gulp.src(`${_destPath}/sprites/*.png`)
		.pipe($.spritesmith({
			imgName: 'sprites.png',
			cssName: '_sprite.scss',
			imgPath: `${_imagePath}/sprites.png`,
			cssTemplate: `${path.sass}/template/spritesmith_tmp.txt`,
			algorithm: 'binary-tree',
			algorithmOpts: { sort: true },
			cssOpts: { functions: true },
			padding: 20,
		}));
	var imgStream = spriteData.img.pipe(gulp.dest(`${_destPath}/`));
	var cssStream = spriteData.css.pipe(gulp.dest(`${_destIncludePath}/include`))
					.pipe($.notify(config.options.notify.sprite.message));

	return $.mergeStream(imgStream, cssStream);
}
// ==============================================
