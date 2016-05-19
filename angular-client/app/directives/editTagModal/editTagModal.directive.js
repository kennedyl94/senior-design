(function() {
  'use strict';

  angular.module('editTagModal')
    .directive('ngEditTagModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/editTagModal/editTagModal.template.html'
    }
  }

})();
