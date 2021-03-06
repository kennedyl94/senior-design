(function() {
  'use strict';

  angular.module('tagSettings')
    .controller('tagSettingsController', ['tagSettingsService', '$modal', Controller]);

  function Controller(tagSettingsService, $modal) {

    var vm = this;

    var editTagModal;
    vm.data = tagSettingsService.data;
    vm.tagInput = "";
    vm.currentPage = 1;
    vm.itemsPerPage = 10;

    vm.del = function(_id) {
      tagSettingsService.delete(_id, function(data, status, headers, config) {
        vm.updateTags();
      });
    };

    vm.add = function() {
      if(vm.tagInput != undefined && vm.tagInput.length != 0) {
        tagSettingsService.submit(vm.tagInput, function (data, status, headers, config) {
          vm.tagInput = "";
          vm.updateTags();
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
