var gulp=require("gulp");
var uglify=require("gulp-uglify");
var babel=require("gulp-babel");
var sass=require("gulp-sass");
var browser=require("browser-sync");
//压缩js
gulp.task("js",function (done) {
    gulp.src("").pipe(uglify()).pipe(gulp.dest(""));
    done();
})

//scss转css
gulp.task("css",function(done){
    gulp.src("").pipe(sass()).pipe(gulp.dest(""));
    done();
})

//开启服务器并自动刷新
gulp.task("server",function(){
    browser.init({
        server:"",
        port:8888;
    })
    //观测文件变化
    gulp.watch("",gulp.series(""));
})