const {src, dest, watch} = require ('gulp');
const browserSync = require('browser-sync').create();
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer'); 

// Static server
function bs() {
    serveSass
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
    return src("./sass/**/*.sass", "./sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("./css"))
        .pipe(browserSync.stream());
};

//min CSS files
function csSmin() {
    src("./css/**/*.css")
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest("./css"));
};

exports.serve = bs;