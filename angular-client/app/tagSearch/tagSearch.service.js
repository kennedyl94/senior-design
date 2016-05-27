(function() {
  'use strict';

  angular.module('tagSearch')
    .factory('tagSearchService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      tags: []
    };

    service.searchTags = function(tagList, success) {
      $http({method: 'POST', url: config.domain + 'tagSearch', data: {tags: tagList}})
        .then(function(data) {
          success(data.data);
        });
    };

    service.update = function() {
      init();
    };

    function init() {
      var promises = [];
      promises.push($http.get(config.domain + 'tagSearch'));
      $q.all(promises).then(function(data) {
        var tags = data[0].data;
        for(var i= tags.length - 1; i >= 0; i--) {
          if( tags[i].text == "inactive") tags.splice(i,1);
        }
        service.data.tags = tags;
      });
    }

    init();
    return service;
  }
})();
