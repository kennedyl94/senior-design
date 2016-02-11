(function(){
  angular.module('editUserModal')
    .controller('EditUserModalController', ['$modalInstance', 'editUserModalService', 'contents', Controller]);

  function Controller($modalInstance, editUserModalService, contents) {
    var vm = this;

    vm.user = contents.user;
    vm.username = contents.user.Username;
    vm.type = contents.user.Type;
    vm.orgs = contents.user.Orgs;

    vm.exitEditUserModal = function () {
      console.log("back");
      $modalInstance.close('ok');
    };

    vm.save = function() {
      console.log("save name: " + vm.user.Username);
      console.log("save id: " + vm.user._id);
      vm.user.Username = vm.username;
      vm.user.Type = vm.type;
      vm.user.Orgs = vm.orgs;
      editUserModalService.saveChanges(vm.user).then(function(response) {
      });
      $modalInstance.close('ok');
    };
  }
})();
