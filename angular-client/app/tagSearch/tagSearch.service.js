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
      var req = {
        method: 'POST',
        url: config.domain + 'tagSearch',
        headers: {},
        data: {tags: tagList}
      };

      $http(req)
        .then(function(res) {
          success(res.data);
        }, function(err) {console.log(err)});
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
          service.data.tags.push({text: tag, checked: false});
        });
      });
    }

    init();
    return service;
  }
})();
