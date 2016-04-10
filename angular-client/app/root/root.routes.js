(function(){
  'use strict';

  angular.module('root')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider.state('root', {
        //abstract: true,
        url: '/',
        views: {
          'navBar': {
            templateUrl: 'navBar/navBar.template.html',
            controller: 'NavBarController',
            controllerAs: 'navCtrl'
          },
          'navSideBar': {
            templateUrl: 'navSidebar/navSidebar.template.html',
            controller: 'NavSidebarController',
            controllerAs: 'navSideBarCtrl'
          },
          'content': {
            templateUrl: 'overview/overview.template.html',
            controller: 'RootController',
            controllerAs: 'rootCtrl'
          }
        }
      });
    }]);
})();
