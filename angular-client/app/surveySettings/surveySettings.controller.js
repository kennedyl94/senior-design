(function() {
  'use strict';

  angular.module('surveySettings')
    .controller('SurveySettingsController', ["surveySettingsService", '$confirm', 'config', Controller]);

  function Controller(surveySettingsService, $confirm, config) {

    var vm = this;
    vm.data = surveySettingsService.data;

    vm.question = {
        question: "",
        tags: [],
        category: ""
    };

    vm.rule = {
        category:"",
        num:0
    };

    // vm.data.num = surveySettingsService.num;
    vm.data.rules = surveySettingsService.rules;
    vm.del = function(_id){

      var req = {
        method: 'delete',
        url: config.domain+'surveySet',
        headers: {'Content-Type': 'application/json'},
        data: _id
      };

      $confirm({text: 'Are you sure you want to delete this question?',
        title: 'Delete Question',
        ok: "Delete",
        cancel: 'Exit'})
        .then(function() {
          surveySettingsService.submit(req, function (data, status, headers, config) {
            location.reload()
          });
      });
    //    $http(req)
    //     .success(
    //     }).error(function(err, status, headers, config) {
    //       console.log('error: ' + err);
    //     });
    };

    vm.add = function(){
      if(vm.question.question == undefined || vm.question.question.length == 0
        || vm.question.category == undefined ||vm.question.category.length == 0
        || vm.question.tags == undefined || vm.question.tags.length == 0) {
        return;
      }

      var req = {
        method: 'post',
        url: config.domain+'surveySet/add',
        headers: {},
        data: vm.question
      };

      surveySettingsService.submit(req, function (data, status, headers, config) {
        location.reload();
      });
    };

    vm.rule = function(){
      if(vm.rule.num == undefined
        || vm.rule.category == undefined || vm.rule.category.length == 0) {
        return;
      }

      var req = {
        method: 'post',
        url: config.domain+'surveySet/addrule',
        headers: {},
        data: {
          category: vm.rule.category,
          num: vm.rule.num
          }
      };

      surveySettingsService.submit(req, function (data, status, headers, config) {
        location.reload();
      });
    };

    vm.delrule = function(rule) {
      var req = {
        method: 'delete',
        url: config.domain+'surveySet/delrule',
        headers: {'Content-Type': 'application/json'},
        data: rule
      };


      $confirm({text: 'Are you sure you want to delete this rule?',
        title: 'Delete Rule',
        ok: "Delete",
        cancel: 'Exit'})
        .then(function() {
          surveySettingsService.submit(req, function (data, status, headers, config) {
            location.reload()
          });
      });



    //    $http(req)
    //     .success(
    //     }).error(function(err, status, headers, config) {
    //       console.log('error: ' + err);
    //     });
    };

    vm.questionNum = function(){
      var req = {
        method: 'post',
        url: config.domain+'surveySet/questionNum',
        headers: {},
        data: {num: vm.data.num}
      };

      surveySettingsService.submit(req, function (data, status, headers, config) {
        location.reload();
      });
    };

  }
})();
