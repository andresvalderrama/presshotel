const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

gulp.task('css', done => {
  gulp.src('./source/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'))
  done()
})

gulp.task('js', done => {
  gulp.src('source/js/**/*.js', { base: 'source' })
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('public'))
  done()
})

gulp.task('watch', done => {
  gulp.watch('source/**/*.(js|scss)', gulp.parallel('css', 'js'))
  done()
})

gulp.task('default', gulp.parallel('css'))
