const gulp = require("gulp");
const sass = require("gulp-sass");

function compilarSass() {
    return gulp.src("css/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("css/"));
}

gulp.task("sass", compilarSass);

function watch() {
    gulp.watch("css/scss/**/*.scss", compilarSass);
}

gulp.task("default", watch);