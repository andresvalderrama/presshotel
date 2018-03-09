const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')

gulp.task('css', done => {
  gulp.src('./source/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'))
  done()
})

gulp.task('fonts', done => {
  gulp.src('./source/fonts/*.?(eot|woff|woff2)')
    .pipe(gulp.dest('public/fonts'))
  done()
})

gulp.task('images', done => {
  gulp.src('./source/img/*.?(jpg|svg|png)')
    .pipe(gulp.dest('public/img'))
  done()
})

gulp.task('js', done => {
  let b = browserify({
    entries: 'source/js/home.js',
    debug: true,
    transform: [
      ["babelify", {presets: ["env"]}]
    ]
  })

  b.bundle()
    .pipe(source('./home.js'))
    .pipe(gulp.dest('public/js'))
  done()
})

gulp.task('watch', done => {
  gulp.watch('source/**/*.(js|scss)', gulp.parallel('css', 'js', 'fonts', 'images'))
  done()
})

gulp.task('default', gulp.parallel('css', 'js', 'fonts', 'images'))
