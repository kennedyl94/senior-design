(function(){
  angular.module('ngNavSidebar')
    .controller('NavSidebarCtrl', ['$rootScope', '$scope', '$state', Controller]);

  function Controller($rootScope, $scope, $state) {
    var vm = this;

    vm.state = $state.current.name;

    vm.toggle = function () {
      $scope.expanded = !$scope.expanded;
      $scope.onToggle({expanded: $scope.expanded});
      //$("#background-image").removeClass("noTransition");
      //$scope.expanded ? $("#background-image").addClass("fg-nav-sidebar-offset") : $("#background-image").removeClass("fg-nav-sidebar-offset");
    };

    $scope.hamburgerUrl = $scope.buttons.hamburgerButton.hamburgerImgUrl;

    vm.navigate = function (button) {
      $state.go(button.link);
      if (!$scope.expanded) {
        vm.toggle();
      }
    };

    vm.currentStateIsInHierarchy = function (button) {
      return vm.state.indexOf(button.link) === 0;
    };

    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams) {
        if (toState.redirect) {
          event.preventDefault();
          $state.go(toState.redirect, toParams);
        }
        else {
          vm.state = toState.name;
        }
      });
  }
})();
