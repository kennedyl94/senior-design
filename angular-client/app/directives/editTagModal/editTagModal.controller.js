(function() {
  'use strict';

  angular.module('editTagModal')
    .controller('EditTagModalController', ['$modalInstance', 'contents', Controller]);

  function Controller($modalInstance, contents) {
    var vm = this;

    vm.modifiedTag = {
      _id: vm.tag._id,
      tag: vm.tag.text
    };
    vm.function = contents.function;

    vm.back = function() {
      $modalInstance.close('ok');
    };

    vm.saveChanges = function() {
      //editTagModalService.saveChanges(vm.user).then(function(response) {
      //});
      $modalInstance.close('ok');
    };
  }
})();
