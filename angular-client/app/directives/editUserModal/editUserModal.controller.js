  angular.module('editUserModal')
    .controller('EditUserModalController', ['$modalInstance', '$window', 'editUserModalService', 'contents', Controller]);

  function Controller($modalInstance, $window, editUserModalService, contents) {
    var vm = this;

    vm.user = contents.user;
    vm.username = contents.user.Username;
    vm.type = contents.user.Type;
    vm.orgs = contents.user.Orgs;

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.save = function() {
      vm.user.Username = vm.username;
      vm.user.Type = vm.type;
      vm.user.Orgs = vm.orgs;
      editUserModalService.save(vm.user).then(function(response) {
      });
      $modalInstance.close('ok');
    };
  }
