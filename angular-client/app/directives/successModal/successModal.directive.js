(function() {
  'use strict';

  angular.module('successModal')
    .directive('ngSuccessModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/successModal/successModal.template.html'
    }
  }

})();
