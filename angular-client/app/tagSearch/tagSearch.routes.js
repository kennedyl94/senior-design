(function(){
  'use strict';

  angular.module('tagSearch')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/tagSearch', {
            templateUrl: 'tagSearch/tagSearch.template.html',
            controller: 'TagSearchController',
            controllerAs: 'tsCtrl'
          });
      }]);

})();
