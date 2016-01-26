(function(){
  'use strict'

  angular.module('navBar')
    .controller('NavBarController', ['$scope', '$location', 'loginService', Controller]);

  function Controller($scope, $location, loginService) {
    var vm = this;
    vm.isLoggedIn = loginService.isLoggedIn();

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
  }
})();
