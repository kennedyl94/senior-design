(function(){
  angular.module('ngTagSelect')
    .controller('ngTagSelectController', ['$scope', 'ngTagSelectService', 'content', Controller]);

  function Controller($scope, ngTagSelectService, content) {
    var vm = this;

    vm.data = ngTagSelectService.data;

    $scope.tagList = vm.data.tags;
    vm.tags = content.tags;
  }
})();
