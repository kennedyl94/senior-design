(function(){
  angular.module('ngNavSidebar')
    .controller('NavSidebarCtrl', ['$rootScope', '$scope', '$state', Controller]);

  function Controller($rootScope, $scope, $state) {
    var vm = this;

    vm.state = $state.current.name;
    $scope.collapsed = false;

    vm.toggle = function () {
      $scope.collapsed = !$scope.collapsed;
      if($scope.collapsed) {
        $('#background-image').css({'margin-left':'-125px'});
      } else {
        $('#background-image').css({'margin-left':'125px'});
      }
    };

    vm.navigate = function (button) {
        $state.go(button.link);
        if (!$scope.collapsed) {
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
