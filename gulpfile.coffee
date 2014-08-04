# ---------------------------------------------------------------------o plugins

gulp 			= require 'gulp'
gp 				= (require 'gulp-load-plugins') lazy: false
path			= require 'path'

###
clean 			= require 'gulp-clean'
concat 			= require 'gulp-concat'
notify 			= require 'gulp-notify'
uglify 			= require 'gulp-uglify'
coffee 			= require 'gulp-coffee'
sass 			= require 'gulp-sass'
minifyCss		= require 'gulp-minify-css'
watch 			= require 'gulp-watch'
livereload 		= require 'gulp-livereload'
plumber			= require 'gulp-plumber'
notify			= require 'gulp-notify'
path			= require 'path'
#sprite 			= require 'gulp-sprite-generator'
###

# ---------------------------------------------------------------------o variables

config = require('./config.json')


# ---------------------------------------------------------------------o scripts

gulp.task 'coffee', ->

	for i in [0...config.coffee.length]

		src = []
		for j in [0...config.coffee[i].src.length]
			src.push(config.src + config.coffee[i].src[j])

		dest = config.src + config.coffee[i].dest
		filename = config.coffee[i].filename

		gulp
			.src( src )
    		.pipe(gp.plumber())
			.pipe(gp.concat( filename ))
			.pipe(gp.coffee({ bare: true }))
			.pipe(gulp.dest( dest ))


gulp.task 'js:dev', ->

	for i in [0...config.js.length]

		src = []
		for j in [0...config.js[i].src.length]
			src.push(config.src + config.js[i].src[j])

		dest = config.dev + config.js[i].dest
		filename = config.js[i].filename

		gulp
			.src( src )
    		.pipe(gp.plumber())
			.pipe(gp.concat( filename ))
			.pipe(gulp.dest( dest ))


gulp.task 'js:dist', ->

	for i in [0...config.js.length]

		src = []
		for j in [0...config.js[i].src.length]
			src.push(config.src + config.js[i].src[j])

		dest = config.dev + config.js[i].dest
		filename = config.js[i].filename

		gulp
			.src( src )
    		.pipe(gp.plumber())
			.pipe(gp.concat( filename ))
			.pipe(gp.uglify())
			.pipe(gulp.dest( dest ))


# ---------------------------------------------------------------------o styles

gulp.task 'sass:dev', ->

	src = []
	for j in [0...config.sass.src.length]
		src.push(config.src + config.sass.src[j])
	gulp
		.src( src )
    	.pipe(gp.plumber())
		.pipe(gp.sass({ style: 'expanded' }))
		.pipe(gulp.dest( config.dev + config.sass.dest ))
		#.pipe(gp.livereload())


gulp.task 'sass:dist', ->

	src = []
	for j in [0...config.sass.src.length]
		src.push(config.src + config.sass.src[j])
	gulp
		.src( src )
    	.pipe(gp.plumber())
		.pipe(gp.sass({ style: 'expanded' }))
		.pipe(gp.minifyCss())
		.pipe(gulp.dest( config.dev + config.sass.dest ))


# ---------------------------------------------------------------------o sprites

# to do



# ---------------------------------------------------------------------o default task

gulp.task 'default', () =>

	gulp.start('js:dev', ['coffee'])
	gulp.start('sass:dev')

	gulp.watch(config.src + '/**/*', (event) =>
		ext = path.extname(event.path)

		switch ext
			when '.coffee'
				taskname = 'coffee'
			when '.js'
				taskname = 'js:dev'
			when '.scss'
				taskname = 'sass:dev'

		gulp.start( taskname )

	)

	#gulp.watch( [ config.src + 'coffee/**/*.coffee', config.src + 'js/**/*.js' ], [ 'js:dev' ] )
	#gulp.watch( [ config.src + 'scss/**/*.scss' ], [ 'sass:dev' ] )


gulp.task 'dist', () =>

	gulp.start('js:dist')
	gulp.start('sass:dist')


