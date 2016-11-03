const path = require('path');
const root = path.resolve(`${__dirname}/..`);

module.exports = {
	root: root,
	siteName: 'testsite',
	paths: {
		browserSync: {
			port: 1000,
			proxy: 'test.xxxxx.co.jp'
		},
		ejs: 'dev',
		sass: 'sass',
		font: {
			rootPath: '/common/font',
			dest: 'source/common/font',
		},
		all: {
			css: 'source/common/css',
			sass: 'sass',
			image: {
				rootPath: '/common/images',
				dest: 'source/common/images',
			},
			js: {
				concat: 'dev/common/js',
				dest: 'source/common/js'
			}
		}
	},
	options: {
		libsass: {
			outputStyle: 'expanded'
		},
		pleeease: {
			mqpacker: true,
			minifier: true,
			sourcemaps: false,
			autoprefixer: {
				browsers: ['last 3 versions'],
				cascade: false
			}
		},
		notify: {
			uglify: {
				title: 'Gulp notifitication: Uglify',
				message: 'Generated file: <%= file.relative %> @ <%= options.date %>',
				templateOptions: {
					date: null
				},
				onLast: true,
				icon: `${root}/node_modules/gulp-notify/assets/gulp.png`
			},
			css: {
				title: 'Gulp notifitication: Sass',
				message: 'Generated file: <%= file.relative %> @ <%= options.date %>',
				templateOptions: {
					date: null
				},
				onLast: true,
				icon: `${root}/node_modules/gulp-notify/assets/gulp.png`
			},
			sprite: {
				title: 'Gulp notifitication: Sprite',
				message: 'Generated file: <%= file.relative %> @ <%= options.date %>',
				templateOptions: {
					date: null
				},
				onLast: true,
				icon: `${root}/node_modules/gulp-notify/assets/gulp.png`
			}
		}
	}
};
