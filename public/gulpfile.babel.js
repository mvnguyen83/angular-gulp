"use strict";

import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import svgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import minify from 'gulp-minify';
import htmlmin from 'gulp-htmlmin';
import htmlify from 'gulp-angular-htmlify';
import ngAnnotate from 'gulp-ng-annotate';
import gulpDocs from 'gulp-ngdocs';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import templateCache from 'gulp-angular-templatecache';
import rename from 'gulp-rename';
import addStream from 'add-stream';
import tingpng from 'gulp-tinypng';
import browserSync from 'browser-sync';

// Tinypng Api Key - 500 images limit per month - Get key here: https://tinypng.com/developers
const TINYPNG_API = 'e9aSCEpvwKzzSFKRgEA9FxW11TUJJF2z';

// Distribution Locations
let distribution = 'dist/';
let dist = {
  css: distribution + 'css',
  img: distribution + 'img',
  svg: distribution + 'svg',
  js: distribution + 'js',
  maps: 'maps', 
  jslib: distribution + 'js/lib',
  templates: distribution + 'js/templates/',
  docs: distribution + 'docs', 
  fonts: distribution + 'fonts',
  serve: [
    distribution + 'css/*.css', 
    distribution + 'js/*.js', 
    distribution + '*.html'
    ]
};

// Source Locations
let source = 'src/assets/';
let bowerSrc = 'bower_components/';
let appSrc = 'src/app/';
let src = {
  sprite: source + 'svg/*.svg',
  styles: {
    location: source + 'scss/**/*.scss',
    autoprefixer: ['last 2 versions', 'safari 6', 'ie 9', 'ios 7', 'android 4']
  },
  scripts: source + 'js/scripts.js',
  appDeps: [ 
    bowerSrc + 'jquery/dist/jquery.js',
    bowerSrc + 'angular/angular.js'
    ],
  app: [ 
    appSrc + 'app.module.js', 
    appSrc + '**/**/*.js', // Declare specific folders i.e. components/**/*.js
    appSrc + 'app.templates.js'
    ],
  htmlTemplates: appSrc + '**/**/*.html',
  htmlify: 'src/views/*.html',
  images: source + 'img/**/*.{png,jpg,jpeg}',
  copyTask: {
    jslib: source + 'js/lib/**/*',
    fonts: source + 'fonts/**/*'
  }
}

// Handle the error
let onError = (err) => {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);
    this.emit('end');
};

// SVG Sprites
gulp.task('sprite', () => {
  return gulp.src(src.sprite)
    .pipe(plumber({errorHandler: onError}))
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '',
          prefix: '',
          sprite: 'spritemap'
        }
      }
    }))
    .pipe(gulp.dest(dist.svg))
    .pipe(notify({ message: 'SVG task complete' }));
});

// CSS
gulp.task('styles', () => {
  return gulp.src(src.styles.location)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: src.styles.autoprefixer
        }))
    .pipe(sourcemaps.write(dist.maps))
    .pipe(gulp.dest(dist.css))
    .pipe(notify({ message: 'Styles task complete' }));
});

// JS - custom scripts
gulp.task('scripts', () => {
  return gulp.src(src.scripts)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('scripts.js'))
      .pipe(minify())
    .pipe(sourcemaps.write(dist.maps))
    .pipe(gulp.dest(dist.js))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// JS - dependences
gulp.task('app-deps', () => {
  return gulp.src(src.appDeps)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
      .pipe(concat('app-deps.js'))
      .pipe(minify())
    .pipe(sourcemaps.write(dist.maps))
    .pipe(gulp.dest(dist.js))
    .pipe(notify({ message: 'App dependences task complete' }));
});

// JS - Angular cache templates
function prepareTemplates() {
  return gulp.src(src.htmlTemplates)
    .pipe(rename({dirname: 'templates/'}))
    .pipe(templateCache());
}

// JS - Angular App Annotate
gulp.task('app-annotate', () => {
  return gulp.src(src.app)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(minify({mangle: false}))
    .pipe(sourcemaps.write(dist.maps))
    .pipe(gulp.dest(dist.js))
    .pipe(notify({ message: 'App task complete' }));
});

// JS - Angular ngdocs
gulp.task('app-ngdocs', [], () => {
  return gulp.src(src.app)
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulpDocs.process())
    .pipe(gulp.dest(dist.docs))
    .pipe(notify({ message: 'App Documents task complete' }));
});

// HTML - Angular Minify template htmls
gulp.task('app-html-minify', function() {
  return gulp.src(src.htmlTemplates)
    .pipe(plumber({errorHandler: onError}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(dist.templates))
    .pipe(notify({ message: 'App templates task complete' }));
});

// HTML - Angular HTML5 validation
gulp.task('app-htmlify', function() {
  return gulp.src(src.htmlify)
    .pipe(plumber({errorHandler: onError}))
    .pipe(htmlify())
    .pipe(gulp.dest(distribution))
    .pipe(notify({ message: 'App templates task complete' }));
});

// Images minify
gulp.task('images', () => {
 return gulp.src(src.images)
   .pipe(plumber({errorHandler: onError}))
   .pipe(cache('tinypnging'))
   .pipe(tingpng(TINYPNG_API))
   .pipe(gulp.dest(dist.img))
   .pipe(notify({ message: 'Image Task Completed: <%= file.relative %>' }));
});

// Copy files to dist
gulp.task('copyTask', () => {
  // JS library
  gulp.src(src.copyTask.jslib)
    .pipe(gulp.dest(dist.jslib));
  // Fonts
  gulp.src(src.copyTask.fonts)
    .pipe(gulp.dest(dist.fonts));
});

// Browsersync task - Static server
gulp.task('serve', () => {
    browserSync.init(dist.serve, {
        server: {
            baseDir: "dist/"
        }
    });
});

// Default Tasks
gulp.task('default', [
  'copyTask', 
  'styles', 
  'scripts', 
  'sprite', 
  'app-deps', 
  'app-annotate',
  'app-ngdocs', 
  'app-html-minify', 
  'app-htmlify', 
  'images'
  ]);

// Watch tasks - gulp watch
gulp.task('watch', ['serve'], () => {
  // SVG files for spritemap
  gulp.watch(src.sprite, ['sprite']);

  // Watch .scss files
  gulp.watch(src.styles.location, ['styles']);

  // Watch scripts.js files
  gulp.watch(src.scripts, ['scripts']);

  // Watch angular dependence .js files
  gulp.watch(src.deps, ['app-deps']);

  // Watch angular app .js files
  gulp.watch(src.app, ['app-annotate','app-ngdocs']);

  // Watch angular .html template files
  gulp.watch(src.htmlTemplates, ['app-html-minify']);

  // Watch angular .html files
  gulp.watch(src.htmlify, ['app-htmlify']);

  // Watch image files
  gulp.watch(src.images, ['images']);

  // Watch for .js library files
  gulp.watch('{src.copyTask.jslib, src.copyTask.fonts}', ['copyTask']);
  
});
