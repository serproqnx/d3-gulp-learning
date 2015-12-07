var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');
    gutil = require('gulp-util'),
    // browserify = require('gulp-browserify'),
    browserify = require('browserify'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint'),
    w3cjs = require('gulp-w3cjs'),
    // compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon'),
    plumber = require('gulp-plumber'),
    source = require('vinyl-source-stream'),
    path = require('path');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

jsSources = [
  'components/scripts/d3.min.js',
  'components/scripts/d3loader.js',
  'components/scripts/jquery.js',
  'components/scripts/jqloader.js',
  'components/scripts/TweenMax.min.js',
  'components/scripts/jquery.scrollmagic.min.js',
  'components/scripts/script.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

gulp.task('js', function() {
  'use strict';

  gulp.src('components/scripts/script.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));

  // gulp.src(jsSources)
  //   .pipe(concat('script.js'))
  //   .pipe(browserify())
  //   .on('error', gutil.log)
  //   .pipe(gulp.dest(outputDir + 'js'))
  //   .pipe(connect.reload());


  browserify(jsSources, {"insertGlobals" : false})
    .bundle()
    .pipe(plumber())
    .pipe(gulpif(env === 'production', uglify()))
    .on('error', gutil.log)
    .pipe(source('script.js'))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload());
  });


// Gulp Sass Task 
gulp.task('sass', function() {
    'use strict';
  gulp.src(sassSources)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [ require('node-bourbon').includePaths, 'components/sass/*']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(connect.reload());
})

gulp.task('watch', function() {
  'use strict';
  gulp.watch(jsSources, ['js']);
  gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['sass']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function() {
  'use strict';
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  'use strict';
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload());
});

// Copy images to production
gulp.task('move', function() {
  'use strict';
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')));
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'move', 'connect']);

// // Gulp Sass Task 
// gulp.task('sass', function() {
//   gulp.src('./scss/{,*/}*.{scss,sass}')
//     .pipe(sourcemaps.init())
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./css'));
// })

// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
// 
// This setup is slightly different from the one on the blog post at
// http://www.zell-weekeat.com/gulp-libsass-with-susy/#comment-1910185635
// gulp.task('default', ['sass'], function () {
//   gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass'])
// });

