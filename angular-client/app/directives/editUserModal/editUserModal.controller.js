(function(){
  angular.module('editUserModal')
    .controller('EditUserModalController', ['$scope', '$modalInstance', 'editUserModalService', 'contents', Controller]);

  function Controller($scope, $modalInstance, editUserModalService, contents) {
    var vm = this;

    vm.user = contents.user;
    vm.username = vm.user.Username;
    vm.email = vm.user.Email;
    vm.orgs = [];
    vm.updateFunction = contents.updateFunction;

    $scope.list_categories = {
      data: [{
        id: 'SL',
        name: 'SL'
      }, {
        id: 'Org',
        name: 'Org'
      }]
    };

    $scope.organizations = editUserModalService.data.orgs;

    $scope.list_category = vm.user.Type;

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.getUser = function() {
      vm.user.Username = vm.username;
      vm.user.Email = vm.email;
      vm.user.Type = $scope.list_category;
      vm.user.Orgs = vm.orgs;
      return vm.user;
    };
  }
})();
