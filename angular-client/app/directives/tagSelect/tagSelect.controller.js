(function(){
  angular.module('ngTagSelect')
    .controller('ngTagSelectController', ['ngTagSelectService', Controller]);

  function Controller(ngTagSelectService) {
    var vm = this;

    vm.data = ngTagSelectService.data;
    vm.tagList = [];
  }
})();
