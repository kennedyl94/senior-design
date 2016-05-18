(function(){
  angular.module('ngOrganizations')
    .controller('ngOrgsController', ['$modal', '$sce', '$scope', '$filter', '$cookies', Controller]);

  function Controller($modal, $sce, $scope, $filter, $cookies) {
    var vm = this;

    /* PAGINATION MANAGEMENT */
    vm.currentPage = 1;
    vm.query = '';

    // We have to use this to initially get the totalItems
    $scope.$watch('ngOrgsCtrl.orgs', function(orgs) {if(orgs){vm.totalItems = orgs.length;}});

    $scope.$watch('ngOrgsCtrl.query', function(query) {
      vm.filtered = $filter('search')(vm.orgs, query, vm.settings);
      vm.totalItems = vm.filtered.length;
      if(vm.query != '') { vm.currentPage = 1; }
    });

    vm.isActive = function(org) {
      var tempTags = [];
      for (var i = 0; i < org.tags.length; i++) {
        tempTags.push(org.tags[i].text);
      }
      return tempTags.indexOf('inactive') == -1;
    };

    vm.isStudentLifeAdmin = function() {
      return $cookies.get('om_slAdmin');
    };

    // Highlights organization description words that match vm.query
    vm.highlight = function(text, search) {
      if(!search) {
        return $sce.trustAsHtml(text);
      }
      return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };

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

    vm.displayTags = function(org) {
      var tagString = '';
      if (org.tags != undefined && org.tags.length > 0) {
        //console.log(org.tags);
        tagString += org.tags[0].text;
        for (var i = 1; i < org.tags.length; i++) {
          tagString += ', ' + org.tags[i].text;
        }
      }
      return tagString;
    }
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
    return function(arr, query, settings) {
      var filtered = [];
      if(!arr) { return filtered; }
      query = query.toLowerCase() || '';
      //console.log(arr);

      var contains = false;
      var i = 0;
      for(i; i < arr.length; i++) {

        var found = false;
        var org = arr[i];
        var name = org.name.toLowerCase();
        var description = org.description.toLowerCase();
        var tags = [];
        for (var q = 0; q < org.tags.length; q++) {
          tags.push(org.tags[q].text);
        }
        //console.log(org);

        if (query != 'inactive' && tags.indexOf('inactive') == -1) {
          var j = 0;
          for (j; j < tags.length; j++) {
            //console.log(query);
            if (query == '' || (tags.length > 0 && tags[j].toLowerCase().indexOf(query || '') !== -1)) {
              //console.log(tags);
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

        // WE WANT TO AUTOMATICALLY SHOW INACTIVE ORGS ON THE ORGS SETTINGS PAGE
        if(settings == 'true' && tags.indexOf('inactive') !== -1) {
          found = true;
          filtered.push(org);
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
