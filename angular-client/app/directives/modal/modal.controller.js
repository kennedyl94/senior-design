
angular.module('modal')
  .controller('ModalController', ['$modalInstance', '$window', '$state', 'modalService', 'contents', Controller]);

function Controller($modalInstance, $window, $state, modalService, contents) {
  var vm = this;

  vm.org = contents.org;
  vm.images = contents.images;

  vm.back = function() {
    $modalInstance.close('ok');
  };

  vm.modifyOrg = function() {
    $modalInstance.close('ok');
    $state.go('root.modifyClub', { redirect : true, org : vm.org });
  }

  vm.deleteOrg = function() {
    //DIALOG -- ARE YOU SURE YOU WANT TO DELETE THIS ORG?
    modalService.deleteOrg(vm.org).then(function () {
      $window.location.reload();
      $modalInstance.close('ok');
    });
  }
}
