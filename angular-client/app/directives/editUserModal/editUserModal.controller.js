(function(){
  angular.module('editUserModal')
    .controller('EditUserModalController', ['$scope', '$modalInstance', 'editUserModalService', 'contents', '$window', Controller]);

  function Controller($scope, $modalInstance, editUserModalService, contents, $window) {
    var vm = this;

    vm.user = contents.user;
    vm.username = vm.user.Username;
    vm.orgs = vm.user.Orgs;

    $scope.list_categories = {
      data: [{
        id: 'SL',
        name: 'SL'
      }, {
        id: 'Org',
        name: 'Org'
      }]
    };

    $scope.list_category = vm.user.Type;

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.saveChanges = function() {
      vm.user.Username = vm.username;
      vm.user.Type = $scope.list_category;
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
