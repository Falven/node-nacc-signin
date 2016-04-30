module.exports = function (grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
          includePaths: [ 'public/stylesheets/' ],
          sourceMap: false
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'public/stylesheets/index.min.css': 'public/stylesheets/index.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/stylesheets/index.min.css': 'public/stylesheets/index.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')()
        ]
      },
      dev: {
        src: 'public/stylesheets/*.css'
      },
      dist: {
        src: 'public/stylesheets/*.css'
      }
    },

    jshint: {
      dev: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        },
        src: [ 'Gruntfile.js', 'public/javascripts/*.js', '!public/javascripts/*.min.js' ]
      }
    },

    concat: {
      dist: {
        src: [ 'public/javascripts/*.js', '!public/javascripts/*.min.js' ],
        dest: 'public/javascripts/index.min.js'
      }
    },

    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          sourceMap: false
        },
        files: {
          'public/javascripts/index.min.js': 'public/javascripts/index.min.js'
        }
      },
      dist: {
        options: {
          mangle: true,
          compress: {
            drop_console: true,
            global_defs: {
              "DEBUG": false
            },
            dead_code: true,
            unused: true
          },
          sourceMap: false
        },
        files: {
          'public/javascripts/index.min.js': 'public/javascripts/index.min.js'
        }
      }
    },

    express: {
      options: {
      },
      dev: {
        options: {
          script: 'bin/www',
          node_env: 'development'
        }
      },
      dist: {
        options: {
          script: 'bin/www',
          node_env: 'production'
        }
      }
    },

    watch: {
      css: {
        files: [ 'public/stylesheets/*.scss', '!public/stylesheets/*.css' ],
        tasks: [ 'sass:dev', 'postcss:dev' ]
      },
      js: {
        files: [ 'Gruntfile.js', 'public/javascripts/*.js', '!public/javascripts/*.min.js' ],
        tasks: [ 'jshint:dev', 'concat:dist', 'uglify:dev' ]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [ 'views/*.pug', 'public/**/*' ]
      }
    }
  });

  grunt.registerTask('default', 'watch');
  grunt.registerTask('dev', [
    'sass:dev',
    'postcss:dev',
    'jshint:dev',
    'concat:dist',
    'uglify:dev'
  ]);
  grunt.registerTask('server', [
    'express:dev',
    'keepalive'
  ]);
  grunt.registerTask('dist', [
    'sass:dist',
    'postcss:dist',
    'jshint:dev',
    'concat:dist',
    'uglify:dist'
  ]);
};