// Import dependencies via require
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var del = require('del');

var plugins = require('gulp-load-plugins')({
    lazy: true,
    overridePattern: false,
    pattern: '{critical,tinyify,babelify,browser-sync,merge-stream}'
})




var settings = {
    distdir: './dist',
    css: {
        source: [
            './src/scss/**/*.{scss, sass, css}'
        ],
        dest: './dist/css'
    },
    html: {
        watch: './src/**/*.html',
        source: './src/*.html',
        dest: '',
        formatting: {
            indent: 4,
            indent_char: ' ',
            wrap_line_length: 78,
            brace_style: 'expand',
            unformatted: ['sub', 'sup', 'b', 'i', 'u', 'span', 'quote', 'strong']
        }
    },
    assets: {
        source: './src/assets/**/*.*',
        dest: ''
    },
    js: {
        source: ['src/**/*.ts'],
        monitor: ['src/**/*.ts'],
        entry: './src/js/main.ts',
        output: 'bundle.js',
        dest: ''
    }
}
//initialize settings
settings.css.dest = settings.distdir + '/css';
settings.js.dest = settings.distdir + '/js';
settings.html.dest = settings.distdir + '/html';
settings.assets.dest = settings.distdir + '/';



// ############### TASKS DEFINITION 

//--------------------------------------
//    Task: CopyData
//--------------------------------------
gulp.task('copyData', () => gulp.src(settings.assets.source).pipe(gulp.dest(settings.assets.dest)));



//--------------------------------------
//    Task: Clean
//--------------------------------------

function clean() {
    return del([settings.distdir + '/**', '!' + settings.distdir]);
}
gulp.task('clean', clean);

// -------------------------------------
//   Task: Move
// -------------------------------------

gulp.task('move', () => {
    const nonProcessed = gulp.src(['src/*/*', '!src/{js,scss,img,inc,assets}/**/*']).pipe(gulp.dest(settings.distdir))

    const vendor = gulp.src('src/**/vendor/**/*').pipe(gulp.dest(settings.distdir))

    return plugins.mergeStream(nonProcessed, vendor)
})
// -------------------------------------
//   Task: CSS (css and css:watch)
// -------------------------------------

gulp.task('css', () => {
    return gulp
        .src(settings.css.source)
        .pipe(gulp.dest(settings.css.dest)) // Pipe unminified
})


gulp.task('css:watch', () => {
    return plugins
        .watchSass(settings.css.source, {
            includePaths: ['node_modules'],
            verbose: true
        })
        .pipe(
            plugins
                .sass({
                    includePaths: ['node_modules']
                })
                .on('error', plugins.sass.logError)
        )
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(settings.css.dest))
        .pipe(plugins.browserSync.reload({ stream: true }))
});

// -------------------------------------
//   Task: HTML (html,html:format,html:watch)
// -------------------------------------

gulp.task('html', () => {
    // sources to inject script/link tags for
    const source = gulp.src([`${settings.css.dest}/*.min.css`, `${settings.js.dest}/*.min.js`])

    return gulp
        .src(settings.html.source)
        .pipe(
            plugins.fileInclude({
                prefix: '@@',
                basepath: 'src'
            })
        )
        .pipe(plugins.inlineImagesize())
        .pipe(plugins.htmlBeautify(settings.html.formatting))
        .pipe(
            plugins.inject(source, {
                addRootSlash: true,
                ignorePath: 'dist',
                removeTags: true
            })
        )
        .pipe(gulp.dest(settings.distdir))
})

gulp.task('html:format', () => {
    return gulp
        .src(settings.html.source)
        .pipe(plugins.htmlBeautify(settings.html.formatting))
        .pipe(gulp.dest('src'))
})

gulp.task('html:watch', () => gulp.watch(settings.html.watch, gulp.series('html')))

//--------------------------------------
//    Task: js
//-------------------------------------

function js() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [settings.js.entry],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .transform('babelify', {
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source(settings.js.output))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(settings.js.dest));
};
gulp.task('js', js);
gulp.task('js:watch', () => gulp.watch(settings.js.source, gulp.series('js')));

// -------------------------------------
//   Task: Images
// -------------------------------------

gulp.task('images', () =>
    gulp
        .src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
)


gulp.task('images:watch', () =>
    gulp.watch('src/img/**/*').on('change', path => {
        gulp
            .src(path)
            .pipe(
                plugins.imagemin([
                    plugins.imagemin.optipng({ optimizationLevel: 3 }),
                    plugins.imagemin.svgo({
                        plugins: [{ removeViewBox: false }]
                    })
                ])
            )
            .pipe(gulp.dest('dist/img'))
    })
);


//--------------------------------------
//    Task: BUILD ...default
//--------------------------------------
function build() {
    return gulp.series('clean', gulp.parallel('copyData','html', 'js', 'move', 'css'), 'images');
}
gulp.task('default', build());

// -------------------------------------
//   Task: browser-sync
// -------------------------------------

gulp.task('browser-sync', () => {
    plugins.browserSync.init({ server: { baseDir: settings.distdir, directory: true } })
    gulp.watch(settings.distdir + '/**/*').on('change', plugins.browserSync.reload)
});

// -------------------------------------
//   Task: Watch
// -------------------------------------

gulp.task(
    'watch',
    gulp.series(
        'default',
        gulp.parallel(
            'css:watch',
            'html:watch',
            'js:watch',
            'images:watch',
            'browser-sync'
        )
    )
)

