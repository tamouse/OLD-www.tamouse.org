var gulp        = require('gulp');
var help        = require('gulp-task-listing');
var cp          = require('child_process');
var cleanCSS    = require('gulp-clean-css');
var notify      = require('gulp-notify') 
var sass        = require('gulp-ruby-sass') ;
var replace     = require('gulp-replace');
var browserSync = require('browser-sync');

var config = {
  assetDir: "./assets",
  distDir: "./_dist",
  nodeDir: "./node_modules",
  outputDir: "./_site",
  sassPath: "./_sass"
}

config.bootstrap = config.nodeDir + '/bootstrap-sass';
config.fontAwesome = config.nodeDir + '/font-awesome';


var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('help', help);

gulp.task('jekyll-build', ['css','icons'], function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(
    'bundle',
    [
      'exec',
      'jekyll',
      'build'
    ],
    {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-build-dist', ['css','icons'], function () {
  return cp.spawn(
    'bundle',
    [
      'exec',
      'jekyll',
      'build',
      '--config',
      '_config.yml,_baseurl.yml',
      '--destination',
      config.distDir
    ],
    {stdio: 'inherit'});
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

gulp.task('icons', function() {
  return gulp.src([
    config.fontAwesome + "/fonts/**.*",
    config.bootstrap + "/assets/fonts/bootstrap/**.*"
  ])
             .pipe(gulp.dest(config.assetDir + "/fonts"))
             .pipe(gulp.dest(config.outputDir + "/assets/fonts"));
});

gulp.task('css', function() {
  return sass(
    config.sassPath + "/main.scss",
    {
      style: "compressed",
      loadPath: [
	config.sassPath,
	config.bootstrap + '/assets/stylesheets',
	config.fontAwesome + '/scss'
      ],
      compass: true
    }
  )
	  .pipe(cleanCSS({compatibility: 'ie8'}))
	  .pipe(gulp.dest(config.assetDir + "/css"))
	  .pipe(gulp.dest(config.outputDir + "/assets/css"))
	  .pipe(browserSync.stream());
});

gulp.task('build', ['icons', 'css' ,'jekyll-build']);

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./_site"
    }
  });

  // Start a watch for rebuilds
  gulp.watch(['_sass/*.scss'], ['css'])
  gulp.watch([
    '_config.yml',
    '*.html',
    '*.md',
    '*.xml',
    '*.txt',
    'pages/**/*.*',
    '_layouts/*.html',
    '_includes/*',
    '_plugins/*.html',
    '_posts/*'
  ],
	     ['jekyll-rebuild']
  );
});


gulp.task('dist', ['icons', 'css', 'jekyll-build-dist']);

gulp.task('default', ['serve']);
