(function() {
  'use strict';

  angular.module('editOrgModal')
    .directive('ngEditOrgModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/editOrgModal/editOrgModal.template.html'
    }
  }

})();
