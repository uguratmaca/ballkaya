const { series, src, dest } = require('gulp'),
    htmlminify = require('gulp-html-minify'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify');

function buildHtml(cb) {
    src("src/*.html")
        .pipe(htmlminify())
        .pipe(dest("dist/"));
    cb();
}

function minifyCss(cb) {
    src('src/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('dist/css'));
    cb();
}

function compress(cb) {

    src('src/js/*.js')
        .pipe(minify({
            ext: {
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(dest('dist/js'));
    cb();
}

function copy(cb) {
    src('src/icon.png').pipe(dest('dist/'));
    cb();
}

function copy2(cb) {
    src('src/fonts/*').pipe(dest('dist/fonts/'));
    cb();
}

function copy3(cb) {
    src('src/img/*').pipe(dest('dist/img/'));
    cb();
}

exports.build = series(buildHtml, minifyCss, compress, copy, copy2, copy3);