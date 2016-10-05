import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import imageop from 'gulp-image-optimization';

const BUILD_PATH = './public';
const SASS_ENTRY_FILE = './src/assets/sass/style.scss';
const WATCH_SCRIPTS = {
    SASS: ['./src/assets/sass/**/**.scss']
};

gulp.task('sass', () => {
  return gulp.src(SASS_ENTRY_FILE)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write('./'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(BUILD_PATH + '/css'));
});

gulp.task('images', function(cb) {
  gulp.src('./src/assets/img/**')
    .pipe( imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./public/img/'))
    .on('end', cb)
    .on('error', cb);
});

gulp.task('watch', () => {
  gulp.watch( WATCH_SCRIPTS.SASS, ['sass']);
});

gulp.task('default', ['sass']);