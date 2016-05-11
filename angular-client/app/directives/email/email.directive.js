(function(){
  angular.module('email')
    .directive('ngEmail', Directive);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/email/email.template.html',
      controller: 'EmailController',
      controllerAs: 'emailCtrl',
      bindToController : {
        orgs: "=",
        submitted: "=",
        address: "="
      },
      scope: {}
    };
  }
})();
