
angular.module('modal')
  .controller('ModalController', ['$modalInstance', 'contents', Controller]);

function Controller($modalInstance, contents) {
  var vm = this;

  vm.org = contents.org;

  vm.back = function() {
    $modalInstance.close('ok');
  };
}
