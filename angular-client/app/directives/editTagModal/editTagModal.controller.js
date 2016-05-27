(function() {
  'use strict';

  angular.module('editTagModal')
    .controller('EditTagModalController', ['$modalInstance', 'contents', Controller]);

  function Controller($modalInstance, contents) {
    var vm = this;
    vm.tag = contents.tag;

    vm.modifiedTag = {
      _id: vm.tag._id,
      text: vm.tag.text
    };
    vm.function = contents.function;

    vm.back = function() {
      $modalInstance.close('ok');
    };

    vm.saveChanges = function() {
      $modalInstance.close('ok');
    };
  }
})();
