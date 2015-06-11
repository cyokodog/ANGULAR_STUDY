

var Task = function(){
    this.init.apply(this, Array.prototype.slice.call(arguments));
};
Task.prototype = {

	plumberWithNotify: function() {
		var o = this, c = o.config;
		return c.p.plumber({errorHandler: c.p.notify.onError('<%= error.message %>')});
	},


	init: function(){
		var o = this, c = o.config = {}

		c.gulp = require('gulp');
		c.p = require('gulp-load-plugins')();
		c.browser = require('browser-sync');
		c.runSequence = require('run-sequence');

		c.gulp.task('compileSass', function(){
			return c.gulp.src('sass/**/*.scss').
				pipe(o.plumberWithNotify()).
				pipe(c.p.cached()).
				pipe(c.p.using()).
				pipe(c.p.sass()).
				pipe(c.p.autoprefixer()).
				pipe(c.gulp.dest('css/'))
			;	
		})

		c.gulp.task('compileEjs', function(){
			return c.gulp.src(['ejs/**/*.html','!ejs/**/_*.ejs']).
				pipe(o.plumberWithNotify()).
				pipe(c.p.cached()).
				pipe(c.p.using()).
				pipe(c.p.ejs()).
				pipe(c.gulp.dest('./'))
			;	
		})

		c.gulp.task('compileNoCacheEjs', function(){
			return c.gulp.src(['ejs/**/*.html','!ejs/**/_*.ejs']).
				pipe(o.plumberWithNotify()).
				pipe(c.p.ejs()).
				pipe(c.gulp.dest('./'))
			;	
		})


		c.gulp.task('minifyCss', function(){
			return c.gulp.src(['css/**/*.css', '!css/**/all.css', '!css/**/all.min.css']).
				pipe(o.plumberWithNotify()).
				pipe(c.p.cached()).
				pipe(c.p.using()).
				pipe(c.p.concat('all.css')).
				pipe(c.gulp.dest('css/')).
				pipe(c.p.minifyCss()).
				pipe(c.p.rename({extname: '.min.css'})).
				pipe(c.gulp.dest('css/'))
			;
		})

		c.gulp.task('minifyJs', function(){
			return c.gulp.src(['js/**/*.js','!js/all.min.js']).
				pipe(o.plumberWithNotify()).
				pipe(c.p.cached()).
				pipe(c.p.using()).
				pipe(c.p.ngAnnotate()).
				pipe(c.p.concat('all.js')).
				pipe(c.gulp.dest('js/')).
				pipe(c.p.uglify()).
				pipe(c.p.rename({extname: '.min.js'})).
				pipe(c.gulp.dest('js/'))
			;
		})

		c.gulp.task('server', function(){
			return c.browser({
				server: {
					baseDir: './'
				}
			});
		})

		c.gulp.task('watchSass', function(){
			return c.gulp.watch(['sass/**/*.scss'], ['compileSass']);
		})
		c.gulp.task('watchEjs', function(){
			return c.gulp.watch(['ejs/**/*.html','ejs/**/_*.ejs'], ['compileEjs']);
		})
		c.gulp.task('watchNoCacheEjs', function(){
			return c.gulp.watch(['ejs/**/_*.ejs'], ['compileNoCacheEjs']);
		})


		c.gulp.task('watchMinifyCss', function(){
			return c.gulp.watch(['./css/**/*.css'], ['minifyCss']);
		})
		c.gulp.task('watchMinifyJs', function(){
			return c.gulp.watch(['./js/**/*.js'], ['minifyJs']);
		})

		c.gulp.task('watchServerReload', ['server'], function(){
			return c.gulp.watch(['./*.html', './css/**/*.css', './js/**/*.js'], c.browser.reload);
		})

		c.gulp.task('dvlp', function() {
			return c.runSequence(
				['compileSass', 'compileEjs'],
				['watchSass', 'watchEjs', 'watchNoCacheEjs'],
				'watchServerReload'
			);
		});

		c.gulp.task('release', function() {
			return c.runSequence(
				['compileSass', 'compileEjs'],
				['minifyCss', 'minifyJs'],
				['watchSass', 'watchEjs'],
				['watchMinifyCss', 'watchMinifyJs'],
				'watchServerReload'
			);
		});
	}
}
new Task();
