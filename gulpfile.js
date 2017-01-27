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
const changed 		= require('gulp-changed');
const gulpif 		= require('gulp-if');
const jsmin 		= require('gulp-jsmin');
const concat 		= require('gulp-concat');
const imagemin 		= require('gulp-imagemin');
const fileinclude 	= require('gulp-file-include');
const svg 			= require('gulp-svg-sprite');
const svg2string 	= require('gulp-svg2string');
const connect 		= require('gulp-connect');
const del 			= require('del');

// is development
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// all paths
const path = {
	assets: {
		fonts: 	'assets/fonts/*',
		img: 	'assets/img/**/*',
		js: 	'assets/js/**/*',
		pages: 	'assets/pages/*.html',
		scss: 	'assets/scss/main.scss',
		svg: 	'assets/svg/*.svg',
	},
	build: {
		base:	'build/',
		fonts: 	'build/fonts/',
		img: 	'build/img/',
		js: 	'build/js/',
		css: 	'build/css/',
		svg: 	'build/img/svg',
	},
	watch: {
		js: 	'assets/js/**/*.js',
		pages: 	'assets/pages/**/*.html',
		scss: 	'assets/scss/**/*.scss',
		svg: 	'assets/svg/*.svg',
		img: 	'assets/img/**/*.*',
		fonts: 	'assets/fonts/**/*.*'
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
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(concat('styles.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulpif(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(path.build.css));
});

// assembly js
gulp.task('dev:js', function(){
	return gulp.src(path.assets.js)
		.pipe(changed(path.build.js))
		.pipe(gulpif(isDevelopment, sourcemaps.init()))
		.pipe(jsmin())
		.pipe(concat('custom.js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulpif(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(path.build.js))
});

// assembly html
gulp.task('dev:html', function() {
	return gulp.src(path.assets.pages)
		.pipe(changed(path.build.base))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(path.build.base));
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
        .pipe(gulp.dest(path.build.img))
		.pipe(svg2string())
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
	'dev:js',
	'dev:img',
	'dev:html',
	'dev:svg',
	'dev:fonts'
));

// delete build directory
gulp.task('clean', function (){
	return del(path.build.base);
});

// watch tasks
gulp.task('watch', function(){
	gulp.watch(path.watch.scss, gulp.series('dev:scss'));
	gulp.watch(path.watch.pages, gulp.series('dev:html'));
	gulp.watch(path.watch.svg, gulp.series('dev:svg'));
	gulp.watch(path.watch.js, gulp.series('dev:js'));
	gulp.watch(path.watch.img, gulp.series('dev:img'));
	gulp.watch(path.watch.fonts, gulp.series('dev:fonts'));
});

// default task
gulp.task('default', gulpif(isDevelopment,
	gulp.series('dev', gulp.parallel('watch', 'server')),
	gulp.series('clean', 'dev'))
);