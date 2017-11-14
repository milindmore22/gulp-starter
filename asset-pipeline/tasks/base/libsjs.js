// jshint es3: false
// jshint esversion: 6

import { isDev, isProd, SRC_DIR, DEST_DIR, libsjs } from '../../config';
import cache from 'gulp-cached';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import { join } from 'path';
import gulpIf from 'gulp-if';
import uglify from 'gulp-uglify';
import { bs } from './browser-sync';

const paths = {
  src:  join( SRC_DIR, libsjs.src, libsjs.fileName ),
  dest: join( DEST_DIR, libsjs.dest )
};

gulp.task( 'libsjs', () => {
  return gulp
    .src( paths.src )
    .pipe( plumber() )
    .pipe( gulpIf( isProd, uglify() ) )
    .pipe( gulp.dest( paths.dest ) )
    .pipe( gulpIf( isDev, bs.stream() ) );
} );
