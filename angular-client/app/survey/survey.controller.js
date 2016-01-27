(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', '$http', Controller]);

  function Controller(surveyService, $http) {

    var vm = this;
    vm.data = surveyService.data;
    
    console.log("TESTING: " + JSON.stringify(surveyService.data.questions));
    
    vm.ans={};
    
    vm.submit = function() {
        
        
        // var dict = [];//... fill dictionary with original values...
        // for (var key in dict.Keys)
        // {
        //     if (!form.Keys.Contains( "MyType." + key.Name ))
        //     {
        //        vm. ans[key] = false;
        //     }
        // }

        // for (var key in form.Keys.Where( k => k.StartsWith("MyType.")))
        // {
        //     var value = form[key].Contains("on"); // just to be safe
        //     // create or retrieve the MyType object that goes with the key
        //     var myType = vm.ans.Keys.Where( k => k.Name == key ).Single();

        //     vm.ans[myType] = value;
        // }
        // // vm.ans = dict;
        
        
    //    alert(vm.ans);
      
    //   var x={};
    //   x.ans = vm.ans;
      console.log(JSON.stringify(vm.ans));
      
      var req = {
        method: 'POST',
        url: 'http://localhost:3000/survey',
        headers: {},
        data: vm.ans
      
      }
      
      $http(req)
        .success(function (data, status, headers, config) {
          console.log(data);
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }
     

  }
  

})();
