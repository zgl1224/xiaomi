let gulp = require('gulp');
let sass = require('gulp-sass');
let watch = require('gulp-watch');

gulp.task('sass',function(){
  return gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css/'));
})

gulp.task('watch',function(done){
  watch('./sass/*.scss',gulp.parallel('sass'));
  done();
})