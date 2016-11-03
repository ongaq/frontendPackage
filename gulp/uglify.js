const config = require('./config');
const path = config.paths;

module.exports = {
	all: {
		concat: [
			`${path.all.js.concat}/jquery-3.1.1.js`,
			`${path.all.js.concat}/jquery-easing.1.3.js`,
			`${path.all.js.concat}/jquery.mobile-events.js`,
			`${path.all.js.concat}/cssua.js`,
			`${path.all.js.concat}/common.es5.js`
		],
		destFile: 'import.js',
		destPath: path.all.js.dest,
		name: 'all',
		babel: {
			target: `${path.all.js.concat}/common.js`,
			fileName: 'common.es5.js',
			dest: path.all.js.concat
		}
	},
};
