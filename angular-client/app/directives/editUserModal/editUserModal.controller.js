(function(){
  angular.module('editUserModal')
    .controller('EditUserModalController', ['$scope', '$modalInstance', 'editUserModalService', 'contents', '$window', '$confirm', Controller]);

  function Controller($scope, $modalInstance, editUserModalService, contents, $window, $confirm) {
    var vm = this;

    vm.user = contents.user;
    vm.username = vm.user.Username;
    vm.email = vm.user.Email;
    vm.orgs = [];

    $scope.list_categories = {
      data: [{
        id: 'SL',
        name: 'SL'
      }, {
        id: 'Org',
        name: 'Org'
      }]
    };
    vm.user = contents.user;
    vm.username = vm.user.Username;
    vm.email = vm.user.Email;
    vm.orgs = [];

    $scope.organizations = editUserModalService.data.orgs;

    $scope.list_category = vm.user.Type;

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.saveChanges = function() {
      vm.user.Username = vm.username;
      vm.user.Email = vm.email;
      vm.user.Type = $scope.list_category;
      vm.user.Orgs = vm.orgs;
      editUserModalService.saveChanges(vm.user).then(function(response) {
      });
      $modalInstance.close('ok');
    };

    vm.deleteUser = function () {
      $confirm({text: 'Are you sure you want to delete: ' + vm.user.Username + '?',
        title: 'Delete User',
        ok: "Delete",
        cancel: 'Exit'})
        .then(function() {
          editUserModalService.deleteUser(vm.user).then(function () {
            $window.location.reload();
          });
        });
    };
  }
})();
