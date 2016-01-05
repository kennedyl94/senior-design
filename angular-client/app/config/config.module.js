(function() {
  'use strict';

  angular.module('config', [])
    .value('config', {
      //domain: 'http://localhost:3000/api/'
      domain: 'http://orgmatcher.msoe.edu/api/'
    });
})();
