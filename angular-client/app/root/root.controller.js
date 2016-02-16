(function() {
  'use strict';

  angular.module('root')
    .controller('RootController', ['$scope', '$cookies', Controller]);

  function Controller($scope, $cookies) {

    var vm = this;

    vm.isStudentLifeAdmin = $cookies.get('om_slAdmin');

    $scope.$watch(function() { return $cookies.get('om_slAdmin'); }, function(isStudentLifeAdmin) {
      vm.isStudentLifeAdmin = isStudentLifeAdmin;
    });
    $scope.$watch(function() { return $cookies.get('om_orgAdmin'); }, function(isOrgAdmin) {
      vm.isOrgAdmin = isOrgAdmin;
    });
  }
})();
