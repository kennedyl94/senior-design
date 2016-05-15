(function() {
  'use strict';

  angular.module('tagSettings')
    .controller('tagSettingsController', ["tagSettingsService", '$http', '$modal', 'config', Controller]);

  function Controller(tagSettingsService, $http, $modal, config) {

    var vm = this;
    vm.tagList = tagSettingsService.data.tags;
    vm.tagInput = "";

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

    // MODAL CREATION
    vm.edit = function(tag) {
      return $modal.open({
        animation: true,
        templateUrl: 'directives/editTagModal/editTagModal.template.html',
        controller: 'EditTagModalController as editTagModalCtrl',
        resolve: {
          contents: function() {
            return {
              tag: tag
            };
          }
        }
      });
    }
  }
})();
