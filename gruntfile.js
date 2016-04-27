module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                includePaths: [ 'views/sass/' ],
                sourceMap: false
            },
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'public/stylesheets/index.min.css': 'views/sass/index.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'public/stylesheets/index.min.css': 'views/sass/index.scss'
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

        concat: {
            dev: {
                src: 'views/js/*.js',
                dest: 'public/javascripts/index.js'
            },
            dist: {
                src: 'public/javascripts/*.js',
                dest: 'public/javascripts/index.js'
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
                src: [ 'Gruntfile.js', 'public/javascripts/index.js' ]
            },
            dist: {
                options: {
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    globals: {
                        jQuery: true
                    }
                },
                src: [ 'Gruntfile.js', 'public/javascripts/index.js' ]
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
                    'public/javascripts/index.min.js': 'public/javascripts/index.js'
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
                    'public/javascripts/index.min.js': 'public/javascripts/index.js'
                }
            }
        },

        clean: {
            dev: 'public/javascripts/index.js',
            dist: 'public/javascripts/index.js'
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

        open : {
            dev : {
                path: 'http://localhost:3000'
            },
            dist: {
                path: 'http://localhost:3000'
            }
        },

        watch: {
            css: {
                files: 'views/sass/*.scss',
                tasks: [ 'sass:dev', 'postcss:dev' ]
            },
            js: {
                files: [ 'Gruntfile.js', 'views/js/*.js' ],
                tasks: [ 'concat:dev', 'jshint:dev', 'uglify:dev', 'clean:dev' ]
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [ 'views/jade/*', 'public/**/*' ]
            }
        }
    });

    grunt.registerTask('default', [
        'express:dev',
        // 'open:dev',
        'watch'
    ]);
    grunt.registerTask('dev', [
        'sass:dev',
        'postcss:dev',
        'concat:dev',
        'jshint:dev',
        'uglify:dev',
        'clean:dev'
    ]);
    grunt.registerTask('dist', [
        'sass:dist',
        'postcss:dist',
        'concat:dist',
        'jshint:dist',
        'uglify:dist',
        'clean:dist'
    ]);
    grunt.registerTask('server', [
        'dist',
        'express:dist',
        // 'open:dist',
        'keepalive'
    ]);
};