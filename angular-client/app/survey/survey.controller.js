(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', Controller]);

  function Controller(surveyService, $http, config) {

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
      surveyService.sendResults(vm.address, vm.orgs);
    };

    vm.downloadResults = function() {

      for(var i = 0; i < vm.orgs.length; i++) {
        vm.content.push(vm.orgs[i].name);
      }

      vm.dd = {
        'content' : [
          {text: 'MSOE Student Organization Survey Matches\n\n', style: 'header' },
          vm.content],

        styles: {
          header: {
            fontSize: 24,
            alignment: 'center',
            bold: true
          }
        }
      };

      vm.content = [];
      pdfMake.createPdf(vm.dd).download('msoeStudentOrgResults.pdf');
    }
  }
})();
