
angular.module('modal')
  .controller('ModalController', ['$modalInstance', '$window', 'modalService', 'contents', Controller]);

function Controller($modalInstance, $window, modalService, contents) {
  var vm = this;

  vm.org = contents.org;
  vm.images = contents.images;

  vm.back = function() {
    $modalInstance.close('ok');
  };

  vm.deleteOrg = function() {
    //DIALOG -- ARE YOU SURE YOU WANT TO DELETE THIS ORG?
    modalService.deleteOrg(vm.org).then(function () {
      $window.location.reload();
      $modalInstance.close('ok');
    });
  }
}
