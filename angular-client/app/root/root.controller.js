(function() {
  'use strict';

  angular.module('root')
    .controller('RootController', ['loginService', '$scope', '$cookies', Controller]);

  function Controller(loginService, $scope, $cookies) {

    var vm = this;

    vm.isStudentLifeAdmin = $cookies.get('om_slAdmin');

    $scope.$watch(function() { return $cookies.get('om_slAdmin'); }, function(isStudentLifeAdmin) {
      vm.isStudentLifeAdmin = isStudentLifeAdmin;
    });
  }
})();
