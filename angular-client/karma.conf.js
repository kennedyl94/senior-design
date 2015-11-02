module.exports = function (config) {
  config.set({

    // Root path location used to resolve all relative paths in files
    basePath: '../',

    // Files to include
    files: [
      'dist/dev/lib/vendor/js/jquery.js',
      '/dist/dev/lib/vendor/js/angular.js',
      'dist/dev/lib/vendor/js/angular-mocks.js',
      'dist/dev/lib/vendor/js/angular-animate.js',
      'dist/dev/lib/vendor/js/angular-cookies.js',
      'dist/dev/lib/vendor/js/bootstrap.js',
      'dist/dev/lib/vendor/js/ui-bootstrap.js',
      'dist/dev/lib/vendor/js/ui-bootstrap-tpls.js',

      '/dist/dev/angularComponents.js',
      '/dist/dev/angularTemplateCache.js',
      '/app/**/*.tests.js'
    ],

    // We can later use grunt to watch this
    autoWatch: false,

    // Testing framework
    frameworks: ['jasmine'],

    // Browsers to test against
    browsers: ['PhantomJS'],

    // Karma plugins
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]
  })
};
