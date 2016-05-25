(function() {
  'use strict';

  angular.module('email')
    .controller('EmailController', ['emailService', Controller]);

  function Controller(emailService) {

    var vm = this;
    vm.content = [];

    vm.sendResults = function() {
      emailService.sendResults(vm.address, vm.orgs);
    };

    vm.downloadResults = function() {
      for(var i = 0; i < vm.orgs.length; i++) {
        vm.content.push(vm.orgs[i].name);
      }

      vm.dd = {
        'content' : [
          {text: 'MSOE Student Organization Survey Matches', style: 'header' },
          {text: 'Based on your choices, we suggest the following orgs:\n\n', style: 'smallHeader' },
          vm.content],

        styles: {
          header: {
            fontSize: 24,
            alignment: 'center',
            bold: true
          },
          smallHeader: {
            fontSize: 16,
            alignment: 'center',
            bold: true,
            italics: true
          }
        }
      };

      vm.content = [];
      pdfMake.createPdf(vm.dd).download('msoeStudentOrgResults.pdf');
    }
  }

})();
