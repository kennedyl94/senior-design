(function() {

  angular.module('addUserModal')
    .factory('addUserModalService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      orgs: {}
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'Organizations/name'}));
      $q.all(promises).then(function(data) {
        for(var i = 0; i< data[0].data.length; i++) {
          service.data.orgs[i] = data[0].data[i].name;
        }
      });
    }

    init();

    return service;
  }
})();
