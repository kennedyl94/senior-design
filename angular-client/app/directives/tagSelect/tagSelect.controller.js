(function(){
  angular.module('ngTagSelect')
    .controller('ngTagSelectController', ['$scope', /*'ngTagSelectService',*/ Controller]);

  function Controller($scope/*, ngTagSelectService*/) {
    var vm = this;

    $scope.tagList = tags;
    vm.tags = [];
  }
})();
