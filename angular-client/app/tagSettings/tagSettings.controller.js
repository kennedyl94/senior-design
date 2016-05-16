(function() {
  'use strict';

  angular.module('tagSettings')
    .controller('tagSettingsController', ["tagSettingsService", '$http', '$modal', 'config', Controller]);

  function Controller(tagSettingsService, $http, $modal, config) {

    var vm = this;

    var editTagModal;
    vm.data = tagSettingsService.data;
    vm.tagInput = "";
    vm.currentPage = 1;
    vm.itemsPerPage = 10;
    //console.log(vm.data.tags);

    vm.del = function(_id) {
      console.log(_id);

      tagSettingsService.delete(_id, function(data, status, headers, config) {
        console.log(data);
        location.reload();
      });
    };

    vm.add = function() {
      console.log(vm.tagInput);

      if(vm.tagInput != undefined && vm.tagInput.length != 0) {
        tagSettingsService.submit(vm.tagInput, function (data, status, headers, config) {
          console.log(data);
          location.reload();
        });
      }
    };

    vm.updateTags = function() {
      tagSettingsService.updateTags();
      vm.data = tagSettingsService.data;
    };

    vm.modifyTag = function(tag) {
      tagSettingsService.edit(tag._id, tag, function() {
        editTagModal.close('ok');
        vm.updateTags();
      });
    };

    // MODAL CREATION
    vm.edit = function(tag) {
      editTagModal = $modal.open({
        animation: true,
        templateUrl: 'directives/editTagModal/editTagModal.template.html',
        controller: 'EditTagModalController as editTagModalCtrl',
        resolve: {
          contents: function() {
            return {
              tag: tag,
              function: vm.modifyTag
            };
          }
        }
      });
    }
  }

  angular.module('tagSettings').filter('startFrom', function () {
    return function (input, start) {
      if (input) {
        start = +start;
        return input.slice(start);
      }
      return [];
    };
  });
})();
