(function() {
  'use strict';

  angular.module('modal')
    .directive('ngModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/modal/modal.template.html',
      controller: function ($scope) {
        $scope.selected = {
          item: $scope.items[0]
        }
      }
    }
  }

})();
