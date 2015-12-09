module.exports = function (config) {
  config.set({

    // Root path location used to resolve all relative paths in files
    basePath: './',

    // Files to include
    files: [
      // Jquery & Angular Dependencies
      'dist/dev/lib/vendor/js/jquery.min.js',
      'dist/dev/lib/vendor/js/angular.min.js',
      'dist/dev/lib/vendor/js/angular-mocks.js',
      'dist/dev/lib/vendor/js/angular-ui-router.min.js',
      'dist/dev/lib/vendor/js/bootstrap.min.js',
      'dist/dev/lib/vendor/js/ui-bootstrap.min.js',
      'dist/dev/lib/vendor/js/ui-bootstrap-tpls.min.js',

      // All angular module components & templates
      'dist/dev/angularComponents.js',
      'dist/dev/angularTemplateCache.js',

      // All tests
      'app/**/*.tests.js'
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
