'use strict';

module.exports = function (grunt) {
  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    ngtemplates: 'grunt-angular-templates',
    includereplace: 'grunt-include-replace'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'dist.dev',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    scriptDependencies: grunt.file.readJSON('app/scriptDependencies.json'),
    gruntConfig: grunt.file.readJSON('config/gruntConfig.json'),

    clean: {
      previousRun: ['dist'],
      temp: ['dist/temp']
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      allJs: {
        src: [ '<%= scriptDependencies.site %>' ],
        dest: 'dist/dev/angularComponents.js'
      }
    },

    uglify: {
      js: {
        src: ['dist/dev/angularComponents.js'],
        dest: 'dist/dev/angularComponents.js'
      }
    },

    copy: {
      indexHtmltoDistDev: {
        src: 'app/index.html',
        dest: 'dist/dev/index.html'
      },
      content: {
        cwd: 'content',
        expand: true,
        src: ['**/*'],
        dest: 'dist/dev/content/'
      },
      style: {
        cwd: '',
        src: ['<%= scriptDependencies.style %>'],
        dest: 'dist/dev/lib/vendor/css/'
      },
      bowerComponentsJs: {
        cwd: '',
        expand: true,
        src: ['<%= scriptDependencies.vendorJs %>'],
        dest: 'dist/dev/lib/vendor/js/',
        flatten: true
      }
    },

    includereplace: {
      dist: {
        files: [
          {
            src: ['**/*template.html'],
            dest: 'dist/temp/templatesWithCss/',
            expand: true,
            cwd: 'app'
          }
        ]
      }
    },

    ngtemplates:  {
    app: {
        cwd: 'dist/temp/templatesWithCss',
        src: ['**/*template.html'],
        dest: 'dist/dev/angularTemplateCache.js',
        options: {
          module: '<%= gruntConfig.templateModule %>'
        }
      }
    },

    // Project settings
    orgFinder: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= orgFinder.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= orgFinder.app %>/{,*/}*.html',
          '<%= orgFinder.app %>/content/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= orgFinder.app %>/content/styles/*.scss'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/components',
                connect.static('./components')
              ),
              connect().use(
                '/content/styles',
                connect.static('./content/styles')
              ),
              connect().use(
                '/content/images',
                connect.static('./content/images')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= orgFinder.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= orgFinder.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= orgFinder.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      dist: [
        'copy:style',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    sass: {
      dist: {
        sourcemap: 'none',
        files: {
          'dist/dev/lib/vendor/css/app/style.css' : 'app/style.scss'
        }
      }
    }
  });

  grunt.registerTask('test', 'Runs the Karma/Jasmine unit tests', function() {
    grunt.task.run([
      'clean:previousRun',
      'includereplace',
      'ngtemplates',
      'concat:allJs',
      'copy:indexHtmltoDistDev',
      'copy:content',
      'copy:style',
      'copy:bowerComponentsJs',
      'clean:temp',
      'karma:unit'
    ]);
  });

  grunt.registerTask('build.dist.dev', 'Compile the project. (Do not start)', function(target) {
    grunt.task.run([
      'clean:previousRun',
      'includereplace',
      'ngtemplates',
      'concat:allJs',
      //'uglify:js',
      'sass:dist',
      'copy:indexHtmltoDistDev',
      'copy:content',
      'copy:style',
      'copy:bowerComponentsJs',
      'clean:temp'
    ]);
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    grunt.task.run([
      'clean:previousRun',
      'includereplace',
      'ngtemplates',
      'concat:allJs',
      //'uglify:js',
      'sass:dist',
      'copy:indexHtmltoDistDev',
      'copy:content',
      'copy:style',
      'copy:bowerComponentsJs',
      'clean:temp',
      'wiredep',
      'connect:livereload',
      'watch'
    ]);
  });
};
