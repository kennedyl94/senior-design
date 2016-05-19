(function() {
  'use strict';

  angular.module('modal')
    .controller('ModalController', ['$modalInstance', 'contents', Controller]);

  function Controller($modalInstance, contents) {
    var vm = this;

    vm.org = contents.org;
    vm.images = contents.images;


    vm.back = function() {
      $modalInstance.close('ok');
    };
  }
})();
