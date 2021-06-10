const gulp = require("gulp"),
	sass = require("gulp-sass"),
	notify = require("gulp-notify")


const compileSass = function() {
	return gulp.src("lib/sass/main.scss")
		.pipe(sass({outputStyle: "compressed"}))
		.on("error", notify.onError(err => "Error: " + err.message))
		.pipe(gulp.dest("lib/"))
}

const watch = function(){
	gulp.watch(["lib/sass/**/*.scss", "lib/sass/*.scss"], compileSass)
}

gulp.task("watch", watch)