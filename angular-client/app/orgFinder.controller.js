(function(){
  'use strict';

  angular.module('orgFinder')
    .controller('OrgFinderController', ['$scope', '$location', Controller]);

  function Controller($scope, $location) {

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }

  }
})();
