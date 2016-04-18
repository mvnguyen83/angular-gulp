# Angular Starter Site with Sass, Gulp, and Sourcemaps

Skeleton with angular app, responsive breakpoints, using a modified Twitter Bootstrap grid and Gulp for optimization

## Dependencies
+ Node.js
+ Ruby
+ Gulp
+ Bower

## Install using NPM
Note: Update to the latest Node.js and npm first

```bash
$ npm install
```

## Install using Bower

```bash
$ bower install
```

## Process javascript, sass and any gulp tasks
Note: Update to the latest gulp first: sudo npm update gulp -g

```bash
$ gulp
```

## Watch javascript, sass, browsersync, and any gulp tasks

```bash
$ gulp watch
```

## Add SVG to spritemap

Drop any svg into the `/src/svg` folder. The name of the svg will become the id of the svg. Make any changes such as `fill="currentColor"` to the svg inside of the `/src/svg` folder and Gulp will process.


## JavaScript
### File structure
* `/src/` -> `readme.md` -- Angular File Structure Example

## Changelog
### Version 6.0
+ Added Bower for dependences 
+ Added Gulp Plugins
    + [gulp-angular-htmlify](https://github.com/pgilad/gulp-angular-htmlify)
    + [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache)
    + [gulp-ng-annotate](https://github.com/Kagami/gulp-ng-annotate)
    + [gulp-ngdocs](https://github.com/nikhilmodak/gulp-ngdocs)
        + angular
        + angular-animate
    + gulp-htmlmin
    + gulp-rename
    + add-stream
+ Compiled /dist folder
+ HTML files are /src/views folder
+ Images/JS/SCSS/etc... are in the src/assets folder
+ Angular apps are in the src/app folder


### Version 5.2
+ Added Gulp Plugins
    + babel for js legacy js: http://babeljs.io/docs/setup/#gulp
    + cached for tingpng: https://www.npmjs.com/package/gulp-cached
+ Fixed %centerVertAll in _format.scss
+ Refactored gulpfile with babel

### Version 5.1
+ Added Gulp Plugins
    + browser-sync : https://www.browsersync.io/docs/gulp/
+ Setup browser-sync with gulp-watch

### Version 5.0
+ Organized Sass Directory Architecture
    + Renamed src/css to src/sass
    + Added folders
    + Added readme.md
+ Added Gulp Plugins
    + gulp-tinypng
    + gulp-plumber
+ Updated Gulpfile
    + Minify images with tinypng
    + Notify for error messages

### Version 4.0

+ Completely restructed build process
    + All site files live inside `/public`
    + One `src` directory that holds all `sass` and `javascript`
    + `src` will compile out to `/public/css` or relative directory
+ Added empty `_assets` directory with subdirectories for all project files
+ Added Gulp Plugins
    + gulp-autoprefixer
    + gulp-concat
    + gulp-sass
    + gulp-sourcemaps
    + gulp-svg-sprite
+ Sourcemaps are being used

### Version 3.1

+ Added base styles
    + centerVert
    + centerVertLarge
    + centerVertAll
    + .resp-break
+ Added @trans(prop) mixin
+ Reworked Gulp process

### Version 3.0

+ Removed Bourbon mixin library
+ Added Gulp
+ Added Gulp Plugins
    + Sass
    + UnCSS
    + Autoprefixer
    + Imagemin
    + Clean
    + Notify
    + Rename
    + Concat
    + Uglify
    + Cache
    + Minify CSS
    + HTML Min

### Version 2.1

+ Modify responsive breakpoints to offer mobile first and standard breakpoints
+ Adjust base typography
+ Add transition variables and use of bourbon for base transitions
+ Add textToImg placeholder for image heading backgrounds

### Version 2.0

+ Updated to the Bootstrap 3 grid. Read the [documentation](http://getbootstrap.com/css/#grid) for grid classes.

## Breakpoint variables

There are two sets or breakpoints to use based on need

### Mobile First

+ breakFirst(medium)
+ breakFirst(large)
+ breakFirst(wide)
+ breakFirst(xxx) - Uses min-width to the custom pixel size

### Set breakpoints, with desktop first

+ break(small)
+ break(medium)
+ break(mediumLand)
+ break(mediumPort)
+ break(wide)
+ break(xxx) - Uses min-width to the custom pixel size
