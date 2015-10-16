(function(){
  'use strict';

  angular.module('organizations')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/organizations', {
            templateUrl: 'organizations/organizations.template.html',
            controller: 'OrganizationsController',
            controllerAs: 'organizationsCtrl'
          });
      }]);

})();
