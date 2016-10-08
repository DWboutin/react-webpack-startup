import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import imageop from 'gulp-image-optimization';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import babel from 'gulp-babel';

import config from 'config';

const BUILD_PATH = './public';
const SASS_ENTRY_FILE = './src/assets/sass/style.scss';
const WATCH_SCRIPTS = {
  SASS: ['./src/assets/sass/**/**.scss'],
  SCRIPTS: ['./src/assets/js/**/**.js'],
};
const { PROD_ENV } = config;

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

gulp.task('scripts', function(){
  return gulp.src( WATCH_SCRIPTS.SCRIPTS )
    .pipe(sourcemaps.init())
    .pipe(concat('plugins.min.js'))
    .pipe(babel({ compact: false }))
    .pipe(uglify({
      hoist_vars: true,
      global_defs: {
        jQuery: false,
        $: false,
      }
    }))
    .pipe(gulpif(!PROD_ENV, sourcemaps.write('./')))
    .pipe(gulp.dest(BUILD_PATH + '/js'));
});

gulp.task('watch', () => {
  gulp.watch( WATCH_SCRIPTS.SASS, ['sass']);
});

gulp.task('build', ['sass', 'images', 'scripts']);
gulp.task('default', ['build', 'watch']);