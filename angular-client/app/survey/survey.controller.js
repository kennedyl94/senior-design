(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', 'emailService', Controller]);

  function Controller(surveyService, emailService, $http, config) {

    var vm = this;
    vm.data = surveyService.data;
    vm.orgs = {};
    vm.content = [];


    // console.log("TESTING: " + JSON.stringify(surveyService.data.questions));

    vm.ans = {};
    vm.address = '';

    vm.submitted = false;

    vm.submit = function() {
      vm.submitted = false;
      surveyService.submit(vm.ans, function(data) {
        vm.orgs = data;
        vm.submitted = true;
      });
    };

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
          {text: 'Based on your choices, we suggest the following orgs:\n\n', style: 'subheader' },
          vm.content],

        styles: {
          header: {
            fontSize: 24,
            alignment: 'center',
            bold: true
          },
          subHeader: {
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
