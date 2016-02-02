(function(){
  angular.module('ngOrganizations')
    .directive('ngOrganizations', Directive);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/organizations/organizations.template.html',
      controller: 'ngOrgsController',
      controllerAs: 'ngOrgsCtrl',
      scope: {
        orgs: "=",
      }
    };
  }
})();
