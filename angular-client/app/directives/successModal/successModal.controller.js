(function() {
  'use strict';

  angular.module('successModal')
    .controller('SuccessModalController', ['contents', Controller]);

  function Controller(contents) {
    var vm = this;

    vm.title = contents.title;
    vm.description = contents.description;

  }
})();
