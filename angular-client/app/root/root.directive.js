(function() {
  'use strict'

  angular.module('root')
    .directive('ngRootPage', Directive);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'root/root.template.html',
      controller: 'RootController',
      controllerAs: 'rootCtrl',
      scope: {

      }
    }
  };

})();
