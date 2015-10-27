(function() {
  'use strict';

  angular.module('modal')
    .directive('ngModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/modal/modal.template.html'
    }
  }

})();
