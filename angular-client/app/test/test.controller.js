(function() {
  'use strict';

  angular.module('test')
    .controller('TestController', ['testService', '$scope', Controller]);

  function Controller(testService, $scope) {

    var vm = this;
    this.data = {};

    testService.then(function (service) {
      vm.data = service.data;
    });
  }
})();
