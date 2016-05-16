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

    function init() {
      var promises = [];
      promises.push($http.get(config.domain + 'tagSearch'));
      $q.all(promises).then(function(data) {
        var tempTags = data[0].data;
        var index = tempTags.indexOf('inactive');
        if (index != -1) {
          tempTags.splice(index, 1);
        }

        tempTags.forEach(function(tag) {
          service.data.tags.push({text: tag.text, checked: false, tag: tag});
        });
      });
    }

    init();
    return service;
  }
})();
