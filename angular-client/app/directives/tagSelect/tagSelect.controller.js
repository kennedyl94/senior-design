(function(){
  angular.module('ngTagSelect')
    .controller('ngTagSelectController', ['$scope', 'ngTagSelectService', Controller]);

  function Controller($scope, ngTagSelectService) {
    var vm = this;

    //vm.data = ngTagSelectService.data;

    //$scope.tagList = vm.data.tags;
    setTimeout(function(){console.log(vm.tagList);}, 5000);
    vm.tags = [];
  }
})();
