(function(){
  'use strict';

  angular.module('navSidebar')
    .controller('NavSidebarController', [Controller]);

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
          text: "Approvals",
          imgUrl: "content/images/svg/approval.svg",
          link: "root.approvals"
        },
        {
          text: "Create Organization",
          imgUrl: "/content/images/svg/create.svg",
          link: "root.createClub"
        },
        {
          text: "Mass Upload",
          imgUrl: "content/images/svg/upload.svg",
          link: "root.massUpload"
        },
        {
          text: "Organization Settings",
          imgUrl: "content/images/svg/orgSettings.svg",
          link: "root.orgSettings"
        },
        {
          text: "User Settings",
          imgUrl: "content/images/svg/userSettings.svg",
          link: "root.userSettings"
        },
        {
          text: "Survey Settings",
          imgUrl: "content/images/svg/survey.svg",
          link: "root.surveySettings"
        }
      ]
    };
  }
})();
