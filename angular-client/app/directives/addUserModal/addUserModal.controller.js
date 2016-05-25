(function(){
  angular.module('addUserModal')
    .controller('AddUserModalController', ['$scope','$modalInstance', 'addUserModalService', 'contents', Controller]);

  function Controller($scope, $modalInstance, addUserModalService, contents) {
    var vm = this;
    vm.aFunction = contents.addFunction;
    vm.user = {
      Username: "",
      Password: "",
      Email: "",
      Type: "",
      Orgs: []
    };
    vm.err = "";

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

    $scope.organizations = addUserModalService.data.orgs;

    vm.name = "";
    vm.password = "";
    vm.email = "";
    vm.orgs = [];

    vm.back = function () {
      $modalInstance.close('ok');
    };

    vm.getNewUser = function() {
      vm.user.Username = vm.name;
      vm.user.Password = vm.password;
      vm.user.Email = vm.email;
      vm.user.Type = $scope.list_category;
      vm.user.Orgs = vm.orgs;
      return vm.user;
    };

    vm.validUsernamePassword = function() {
      if (vm.name == "" || vm.password == "") {
        //vm.err = "Please enter a valid username and password";
        return false;
      }
      return true;
    }
  }
})();
