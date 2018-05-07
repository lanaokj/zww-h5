var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync=require("browser-sync");
var uglify=require("gulp-uglify");
var htmlmin=require("gulp-htmlmin");
var imagemin=require("gulp-imagemin");
// var babel = require("gulp-babel");  
var reload= browserSync.reload;
var fileName = "lanaokj";
//sass
gulp.task('scss',function(){
  return gulp.src('./scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest('./' + fileName + '/css'))
      .pipe(gulp.dest('./css'))
      .pipe(reload({stream: true})); 
})
gulp.task("imagemin",function(){
    return gulp.src("images/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("./" + fileName + "/images"));
})
// gulp.task('scss',function(){
//   return gulp.src('./scss/*.scss')
//       .pipe(sourcemaps.init())
//       .pipe(sass().on('error', sass.logError))
//       .pipe(sourcemaps.write("./"))

//       .pipe(gulp.dest('./css'))
//       .pipe(reload({stream: true})); 
// })
gulp.task("browserSync",function(){
    browserSync.init({
      server: {
          baseDir: "./" + fileName
      }
    });
})
gulp.task("uglify",function(){
  gulp.src('js/*.js')
  // .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('./' + fileName + '/js'))
})
gulp.task("htmlmin",function(){
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
};     
  return gulp.src("./*.html")
              .pipe(htmlmin(options))
              .pipe(gulp.dest("./" + fileName))
})
gulp.task('default',["scss","browserSync","htmlmin","uglify","imagemin"],function(){
  gulp.watch('scss/*.scss',["scss"]);
  gulp.watch("./*.html",['htmlmin']);
  gulp.watch("js/*.*",["uglify"]);
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("images/*.*",["imagemin"]);
})
