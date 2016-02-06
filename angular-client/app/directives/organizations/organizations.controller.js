(function(){
  angular.module('ngOrganizations')
    .controller('ngOrgsController', ['$modal', '$sce', '$scope', '$filter', Controller]);

  function Controller($modal, $sce, $scope, $filter) {
    var vm = this;

    /* PAGINATION MANAGEMENT */
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.query = '';

    // We have to use this to initially get the totalItems
    $scope.$watch('orgs', function(orgs) {$scope.totalItems = orgs.length;});

    $scope.$watch('query', function(query) {
      $scope.filtered = $filter('search')($scope.orgs, query);
      $scope.totalItems = $scope.filtered.length;
      $scope.currentPage = 1;
    });

    // Highlights organization description words that match vm.query
    vm.highlight = function(text, search) {
      if(!search) {
        return $sce.trustAsHtml(text);
      }
      return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    }

    // -- TODO --
    // DUMMY DATA UNTIL IMAGE DATA IS ADDED TO ORGANIZATION SCHEMA
    vm.images = [
      {url: "content/images/msoe1.jpg", name: "Picture 1"},
      {url: "content/images/msoe2.jpg", name: "Picture 2"},
      {url: "content/images/msoe3.jpg", name: "Picture 3"},
      {url: "content/images/msoe4.jpg", name: "Picture 4"},
      {url: "content/images/msoe5.jpg", name: "Picture 5"},
      {url: "content/images/msoe6.jpg", name: "Picture 6"},
      {url: "content/images/msoe7.jpg", name: "Picture 7"}
    ];

    vm.options = [
      {id: "name", name: "Name"},
      {id: "description", name: "Description"},
      {id: "contact.name", name: "Contact"}
    ];

    vm.selectedOption = vm.options[0];

    /*vm.sortOrgs = function(selectedOption) {
      organizationService.sortOrgs(selectedOption).then(function(sortedOrgs) {
        vm.data.orgs = sortedOrgs;
      });
    };*/

    // MODAL CREATIONS
    vm.openModal = function(org, images) {

      return $modal.open({
        animation: true,
        templateUrl: 'directives/modal/modal.template.html',
        controller: 'ModalController as modalCtrl',
        resolve: {
          contents: function() {
            return {
              org: org,
              images: images
            };
          }
        }
      });
    };
  }

  angular.module('ngOrganizations').filter('startFrom', function () {
    return function (input, start) {
      if (input) {
        start = +start;
        return input.slice(start);
      }
      return [];
    };
  });

  angular.module('ngOrganizations').filter('search', function() {
    return function(arr, query) {
      var filtered = [];
      query = query || '';
      if(query != '') { query = query.toLowerCase(); }

      var contains = false;
      var i = 0;
      for(i; i < arr.length; i++) {

        var found = false;
        var org = arr[i];
        var name = org.name.toLowerCase();
        var description = org.description.toLowerCase();
        var tags = org.tags;

        if (query != 'inactive' && tags.indexOf('inactive') == -1) {
          var j = 0;
          for (j; j < tags.length; j++) {
            if (tags[j].toLowerCase().indexOf(query || '') !== -1) {
              found = true;
              filtered.push(org);
              break;
            }
          }
        } else if (query == 'inactive' && tags.indexOf('inactive') != -1) {
          found = true;
          filtered.push(org);
          continue;
        }

        var contains =  !!((tags.indexOf('inactive') == -1 &&
        (name.indexOf(query || '') !== -1 || description.indexOf(query || '') !== -1)));
        if(contains && !found) {
          filtered.push(org);
        }
      }
      return filtered;
    }
  });
})();
