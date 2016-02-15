(function(){
  angular.module('addUserModal')
    .controller('AddUserModalController', ['$scope','$modalInstance', 'addUserModalService', Controller]);

  function Controller($scope, $modalInstance, addUserModalService) {
    var vm = this;

    $scope.list_categories = {
      data: [{
        id: 'SL',
        name: 'SL'
      }, {
        id: 'Org',
        name: 'Org'
      }]
    };
    $scope.list_category = 'SL';

    vm.name = "";
    vm.password = "";
    vm.orgs = [].toString();

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.saveNewUser = function() {
      if (vm.name == "" || vm.password == "") {
        alert("Please enter a valid username and password");
      } else {
        var user = {
          Username: vm.name,
          Password: vm.password,
          Type: $scope.list_category,
          Orgs: vm.orgs
        };
        addUserModalService.saveNewUser(user).then(function () {
        });
        $modalInstance.close('ok');
      }
    }
  }
})();
