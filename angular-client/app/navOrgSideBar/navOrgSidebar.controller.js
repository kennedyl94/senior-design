(function(){
  'use strict';

  angular.module('navOrgSidebar')
    .controller('NavOrgSidebarController', [Controller]);

  function Controller() {

    var vm = this;

    vm.buttons = {
      toggleButton:
      {
        text: "Toggle",
        imgUrl: "content/images/svg/sidebar-expand-collapse-left.svg",
        imgUrlCollapsed: "content/images/svg/sidebar-expand-collapse-right.svg",
        imgUrlExpanded: "content/images/svg/sidebar-expand-collapse-left.svg"
      },
      navButtons:
        [
          {
            text: "Organization Settings",
            imgUrl: "content/images/svg/orgSettings.svg",
            link: "root.orgSettings"
          }
        ]
    };
  }
})();

