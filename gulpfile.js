var gulp = require('gulp'),
	htmlminify = require("gulp-html-minify"),
	imagemin = require('gulp-imagemin'),
	cleanCSS = require('gulp-clean-css'),
	minify = require('gulp-minify'),
	gulpCopy = require('gulp-copy');
 
gulp.task('image-min', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('copy' , function(){

var sourceFiles = [ 'src/icon.png' ];
var destination = 'dist/';

return gulp
    .src(sourceFiles)
    .pipe(gulp.dest(destination));
});

gulp.task('copy2' , function(){

var sourceFile = 'src/fonts/*';
var destination = 'dist/fonts/';

return gulp
    .src(sourceFile)
    .pipe(gulp.dest(destination));
});

gulp.task('build-html' , function(){
    return gulp.src("src/*.html")
        .pipe(htmlminify())
        .pipe(gulp.dest("dist/"))
});

gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', function() {
  gulp.src('src/js/*.js')
    .pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', 
['image-min','build-html','minify-css','compress','copy','copy2']);