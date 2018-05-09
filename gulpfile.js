/**

	TODO:
	- Gulpfile.js

 */

'use strict';


// require all modules 
const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const autoprefixer 	= require('gulp-autoprefixer');
const sourcemaps 	= require('gulp-sourcemaps');
const rename 		= require('gulp-rename');
const gulpif 		= require('gulp-if');
const uglify		= require('gulp-uglify');
const strip			= require('gulp-strip-comments');
const concat		= require('gulp-concat');
const changed 		= require('gulp-changed');
const imagemin 		= require('gulp-imagemin');
const fileinclude 	= require('gulp-file-include');
const svg 			= require('gulp-svg-sprite');
const connect 		= require('gulp-connect');
const livereload	= require('gulp-livereload');
const install		= require('gulp-install');
const plumber		= require('gulp-plumber');
const notify		= require('gulp-notify');
const webpackStream	= require('webpack-stream');
const webpack 		= webpackStream.webpack;
const del 			= require('del');
const AnyBarWebpackPlugin = require('anybar-webpack');

// is development
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var dir;
if (dir !== undefined) dir = process.env.DIR;
else dir = '';

// all paths
const path = {
	assets: {
		fonts: 	'assets/fonts/*',
		img: 	'assets/img/**/*',
		js: 	'assets/js/',
		pages: 	'assets/pages/*.html',
		scss: 	'assets/scss/main.scss',
		svg: 	'assets/svg/*.svg',
		video: 	'assets/video/**/*'
	},
	build: {
		base:	dir+'build/',
		fonts: 	dir+'build/fonts/',
		img: 	dir+'build/img/',
		js: 	dir+'build/js/',
		css: 	dir+'build/css/',
		svg: 	dir+'build/img/svg',
		video: 	dir+'build/video/'
	},
	watch: {
		js: 	'assets/js/**/*.js',
		pages: 	'assets/pages/**/*.html',
		scss: 	'assets/scss/**/*.scss',
		svg: 	'assets/svg/*.svg',
		img: 	'assets/img/**/*.*',
		fonts: 	'assets/fonts/**/*.*',
		video: 	'assets/video/**/*'
	},
	modules: {
		js: {
			path: 'assets/js/vendor/',
			files: [
				'node_modules/jquery/dist/jquery.min.js',
				'node_modules/owl.carousel/dist/owl.carousel.min.js',
				'node_modules/fullpage.js/dist/jquery.fullpage.min.js',
				'node_modules/fullpage.js/vendors/scrolloverflow.min.js',
				'node_modules/inputmask/dist/min/inputmask/jquery.inputmask.min.js',
				'node_modules/jquery-validation/dist/jquery.validate.min.js'
			]
		},
		css: {
			path: 'assets/scss/vendor/',
			files: [
				'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
				'node_modules/fullpage.js/dist/jquery.fullpage.css'
			]
		}
	}
};


/*=================================
=            dev tasks            =
=================================*/

// assembly css
gulp.task('dev:scss', function(){
	return gulp.src(path.assets.scss)
		.pipe(changed(path.build.css))
		.pipe(gulpif(isDevelopment, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat('styles.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulpif(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(path.build.css))
		.pipe(livereload());
});

// webpack
gulp.task('dev:webpack', function(callback){
	var options = {
		context: __dirname + '/assets/js',
		entry: {
			'main': './main'
		},
		output: {
			path: __dirname + './build/js',
			filename: 'build.min.js',
			library: 'main',
			libraryTarget: 'var'
		},
		module:  {
            loaders: [{
                test:    /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader:  'babel-loader',
                query: {
					presets: ['es2015']
				}
            }]
        },
		plugins: isDevelopment ? [
			new webpack.ProvidePlugin({
			    'window.jQuery'    : 'jquery',
			    'window.$'         : 'jquery',
			    'jQuery'           : 'jquery',
			    '$'                : 'jquery'
			})
		] : [],
		devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
		watch: isDevelopment
	};

	function done(err, stats){
		if (err) return;
		console.log(stats.toString());
	}

	return gulp.src(path.assets.js)
		.pipe(plumber({
			errorHander: notify.onError()
		}))
		.pipe(webpackStream(options, null, done))
		.pipe(gulp.dest(path.build.js))
		.on('data', function(){
			callback();
		});
});

// assembly js
gulp.task('dev:js', function(){
	return gulp.src([path.assets.js+'*.js', '!'+path.assets.js+'main.js'])
		.pipe(strip())
		.pipe(gulp.dest(path.build.js))
		.pipe(livereload());
});

// assembly html
gulp.task('dev:html', function() {
	return gulp.src(path.assets.pages)
		// .pipe(changed(path.build.base))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(path.build.base))
		.pipe(livereload());
});

// assembly images
gulp.task('dev:img', function(){
	return gulp.src(path.assets.img)
		.pipe(changed(path.build.img))
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img));
});

// assembly video
gulp.task('dev:video', function(){
	return gulp.src(path.assets.video)
		.pipe(gulp.dest(path.build.video));
})

// assembly fonts
gulp.task('dev:fonts', function(){
	return gulp.src(path.assets.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

// assembly svg 
gulp.task('dev:svg', function(){
	var svgConfig = {
		shape: {
			dimension: {
				maxWidth: 30,
				maxHeight: 30,
				attributes: false
			},
			spacing: {
				padding: 0
			},
			transform: ['svgo']
		},
		svg: {
			xmlDeclaration      : false,
			doctypeDeclaration  : false
		},
		mode: {
			css: false,
			view: false,
			defs: false,
			stack: false,
			symbol: {
				dest: 'svg',
				sprite: 'sprite.svg',
				bust: false,
				example: true
			}
		}
	};
	return gulp.src(path.assets.svg)
		.pipe(changed(path.assets.svg))
		.pipe(svg(svgConfig))
		.pipe(gulp.dest(path.build.img));
});

/*=====  End of dev tasks  ======*/

//  task server
gulp.task('server', function() {
	connect.server({
		host: 'localhost',
		root: path.build.base,
		port: 1000,
	});
});

// task dev
gulp.task('dev', gulp.parallel(
	'dev:scss',
	gulp.series(
		'dev:webpack',
		'dev:js'
	),
	'dev:img',
	'dev:video',
	'dev:fonts',
	gulp.series(
		'dev:svg',
		'dev:html'
	)
));

// delete build directory
gulp.task('clean', function (){
	return del(path.build.base);
}); 

// copy js files
gulp.task('copy:js', function(){
	return gulp.src(path.modules.js.files)
		.pipe(gulp.dest(path.modules.js.path))
});

// copy css files
gulp.task('copy:css', function(){
	return gulp.src(path.modules.css.files)
		.pipe(gulp.dest(path.modules.css.path));
});

gulp.task('bower', function(){
	return gulp.src(['./bower.json'])
		.pipe(install({
			allowRoot: true
		}));
});

// copy node modules to assets
gulp.task('copy', gulp.series(
	'bower',
	'copy:js',
	'copy:css'
));

// watch tasks
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(path.watch.scss, gulp.series('dev:scss'));
	gulp.watch(path.watch.fonts, gulp.series('dev:fonts'));
	gulp.watch(path.watch.pages, gulp.series('dev:html'));
	gulp.watch(path.watch.svg, gulp.series('dev:svg', 'dev:html'));
	gulp.watch(path.watch.js, gulp.series('dev:webpack', 'dev:js'));
	gulp.watch(path.watch.video, gulp.series('dev:video'));
	gulp.watch(path.watch.img, gulp.series('dev:img'));
});

// init task (first run)
gulp.task('init', gulp.series(
	'copy',
	'dev',
	gulp.parallel('watch', 'server')
));

// default task
gulp.task('default', gulpif(isDevelopment,
	gulp.series('dev', gulp.parallel('watch', 'server')),
	gulp.series('clean', 'dev'))
);