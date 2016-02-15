(function() {
  'use strict';

  angular.module('editUserModal')
    .directive('ngModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/editUserModal/editUserModal.template.html'
    }
  }
})();
