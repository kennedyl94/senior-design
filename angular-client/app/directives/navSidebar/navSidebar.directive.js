(function(){
  angular.module('ngNavSidebar')
    .directive('ngNavSidebar', Directive);

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'directives/navSidebar/navSidebar.template.html',
      controller: 'NavSidebarCtrl',
      controllerAs: 'navBarCtrl',
      scope: {
        // Example/expected data structure for the buttons object:
        // {
        //    logoutButton : {
        //        resourceKey:"FigloSuite_btnLogOut",
        //        imgUrl:"/common_package/client/content/icons/log-out-menu.svg",
        //        logout: function () {
        //            // end session
        //        },
        //    toggleButton : {
        //        resourceKey: "FigloSuite_btnClose",
        //        closeImgUrl: "/common_package/client/content/icons/sidebar-back.svg",
        //        openImgUrl: "/common_package/client/content/icons/sidebar-open.svg",
        //    },
        //    navButtons : [
        //        {resourceKey:"FigloSuite_Enums_Type_Home", imgUrl:"/common_package/client/content/icons/retirement.svg", link: "root.overview"},
        //        {resourceKey:"FigloSuite_AdvisorControl_tabClients", imgUrl:"/common_package/client/content/icons/long-term-care.svg", link: "root.clients"},
        //        {resourceKey:"FigloSuite_AdvisorControl_tabSettings",imgUrl:"/common_package/client/content/icons/family.svg", link: "root.settings"}
        //
        //    ]
        // },
        buttons: "=",
        expanded: "=",
        onToggle: "&"
      }
    };
  }
})();
