(function(){
  angular.module('ngNavSidebar')
    .directive('ngNavSidebar', Directive);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/navSidebar/navSidebar.template.html',
      controller: 'NavSidebarCtrl',
      controllerAs: 'navBarCtrl',
      scope: {
        buttons: "="
      }
    };
  }
})();
