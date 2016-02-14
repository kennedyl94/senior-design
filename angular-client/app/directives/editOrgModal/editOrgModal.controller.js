
angular.module('editOrgModal')
  .controller('EditOrgModalController', ['$modalInstance', 'contents', Controller]);

function Controller($modalInstance, contents) {
  var vm = this;

  vm.org = contents.org;

  vm.back = function() {
    $modalInstance.close('ok');
  };
}
