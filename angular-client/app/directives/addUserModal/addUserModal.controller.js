(function(){
  angular.module('addUserModal')
    .controller('AddUserModalController', ['$modalInstance', 'addUserModalService', Controller]);

  function Controller($modalInstance, addUserModalService) {
    var vm = this;

    vm.name = "";
    vm.password = "";
    vm.type = "";
    vm.orgs = [].toString();

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.saveNewUser = function() {
      var user = {
        Username: vm.name,
        Password: vm.password,
        Type: vm.type,
        Orgs: vm.orgs
      }
      addUserModalService.saveNewUser(user).then(function() {
      })
      $modalInstance.close('ok');
    };
  }
})();
