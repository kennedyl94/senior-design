(function(){
  'use strict';

  angular.module('tagSearch')
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.tagSearch', {
            url: 'tagSearch',
            views: {
              'content@': {
                templateUrl: 'tagSearch/tagSearch.template.html',
                controller: 'TagSearchController',
                controllerAs: 'tsCtrl'
              }
            }
          });
      }]);

})();
