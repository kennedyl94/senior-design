module.exports = function (config) {
  config.set({

    // Root path location used to resolve all relative paths in files
    basePath: '../',

    // Files to include
    files: [
      'app/components/jquery/dist/jquery.js',
      'app/components/angular/angular.js',
      'app/components/angular-cookies/angular-cookies.js',
      'app/**/*.js',
      'app/directives/**/*.js',
      'app/**/*.tests.js'
    ],

    // We can later use grunt to watch this
    autoWatch: false,

    // Testing framework
    frameworks: ['jasmine'],

    // Browsers to test against
    browers: ['PhantomJS'],

    // Karma plugins
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]
  })
};
