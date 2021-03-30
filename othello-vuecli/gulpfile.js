const { src, dest, watch, series } = require('gulp');
// Clean
const clean = require('gulp-clean');
// Sass
const sass = require('gulp-sass');
// Source maps SASS
const sourcemaps = require('gulp-sourcemaps');

function cleanDist() {
    return src('public/css/*')
        .pipe(clean());
}

function vigilantes() {
    watch('src/assets/sass/**/*.sass', css);
}

function css() {
    return src('src/assets/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('public/css'))
        .pipe(browserSync.stream())
}

function cssSourcemaps() {
    return src('src/assets/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
}

// Tareas

// Default = gulp
exports.default = series(
    cleanDist,
    css,
    cssSourcemaps
);

// Default: gulp dev
exports.dev = series(
    cleanDist,
    css,
    cssSourcemaps,
    vigilantes
);