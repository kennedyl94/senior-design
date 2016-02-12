(function(){
  angular.module('ngOrganizations')
    .directive('ngOrganizations', Directive);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/organizations/organizations.template.html',
      controller: 'ngOrgsController',
      controllerAs: 'ngOrgsCtrl',
      /** bindToController allows us to do exactly as it says -- we are able
       * to bind variables to the controller's scope (vm) instead of $scope.
       * This is useful as we are trying to avoid using $scope. Unfortunately,
       * we still have to use $scope for watchers.
       */
      bindToController : {
        orgs: "=",
        totalItems: "@",
        itemsPerPage: "="
      },
      scope: {}
    };
  }
})();
