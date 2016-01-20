(function(){
  'use strict';

  angular.module('root')
    .controller('RootController', [Controller]);

  function Controller() {

    var vm = this;

    vm.buttons = {
      toggleButton : {
        resourceKey: "Close",
        closeImgUrl: "/common_package/client/content/icons/menu-info.svg",
        openImgUrl: "/common_package/client/content/icons/menu-info.svg"
      }
    };

    vm.navBarStatus = {
      expanded: false
    };

    vm.toggleNavBar = function(expanded) {
      if (expanded)
      {
        vm.navBarStatus.expanded = false;
      }
    };
  }
})();
