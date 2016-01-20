(function(){
  'use strict'

  angular.module('navSidebar')
    .controller('NavSidebarController', [Controller]);

  function Controller() {

    var vm = this;

    vm.buttons = {
      toggleButton: {
        resourceKey: "FigloSuite_btnClose",
        closeImgUrl: "content/images/svg/sidebar-expand-collapse-left.svg",
        openImgUrl: "content/images/svg/sidebar-expand-collapse-right.svg"
      },
      hamburgerButton : {
        hamburgerImgUrl: "content/images/svg/menu-hamburger.svg"
      },
      navButtons: [
        {
          text: "Home",
          imgUrl: "/content/images/svg/menu-home.svg",
          link: "root",
          sortOrder: 0
        },
        {
          text: "Organizations",
          imgUrl: "content/images/svg/menu-client-list.svg",
          link: "root.organizations",
          sortOrder: 1
        }
      ]
    };
  }
})();
