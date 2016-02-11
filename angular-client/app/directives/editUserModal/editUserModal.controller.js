(function(){
  angular.module('editUserModal')
    .controller('EditUserModalController', ['$modalInstance', 'editUserModalService', 'contents', '$window', Controller]);

  function Controller($modalInstance, editUserModalService, contents, $window) {
    var vm = this;

    vm.user = contents.user;
    vm.username = contents.user.Username;
    vm.type = contents.user.Type;
    vm.orgs = contents.user.Orgs;

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.saveChanges = function() {
      vm.user.Username = vm.username;
      vm.user.Type = vm.type;
      vm.user.Orgs = vm.orgs;
      editUserModalService.saveChanges(vm.user).then(function(response) {
      });
      $modalInstance.close('ok');
    };

    vm.deleteUser = function () {
      //DIALOG -- ARE YOU SURE YOU WANT TO DELETE THIS ORG?
      editUserModalService.deleteUser(vm.user).then(function () {
      });
      $window.location.reload();
    };
  }
})();
