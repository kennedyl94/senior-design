(function(){
  'use strict'

  angular.module('navBar')
    .controller('NavBarController', ['$scope', '$location', Controller]);

  function Controller($scope, $location) {
    var vm = this;

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
  }
})();
