(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', '$http', Controller]);

  function Controller(tagSearchService, $http) {

    var vm = this;

    tagSearchService.then(function (service) {

    });
  }

})();
