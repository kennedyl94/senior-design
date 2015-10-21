(function(){
  'use strict';

  angular.module('createClub')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/createClub', {
            templateUrl: 'createClub/createClub.template.html',
            controller: 'createClubController',
            controllerAs: 'crClCtrl'
          });
      }]);

})();
