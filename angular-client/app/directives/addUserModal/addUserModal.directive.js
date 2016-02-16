(function() {

  angular.module('addUserModal')
    .directive('ngModal', [Directive]);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/addUserModal/addUserModal.template.html'
    }
  }
})();
