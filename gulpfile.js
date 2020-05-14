var { dest, src, watch } = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

const files = ['src/**/*.js','src/index.js']

function js() {
  return src(files)
    .pipe(sourcemaps.init())
    .pipe(concat('game.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
}

exports.default = function() {
  watch(files, js)
}