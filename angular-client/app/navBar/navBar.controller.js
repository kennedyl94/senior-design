(function(){
  'use strict'

  angular.module('navBar')
    .controller('NavBarController', ['$scope', '$location', Controller]);

  function Controller($scope, $location) {

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
  }
})();
