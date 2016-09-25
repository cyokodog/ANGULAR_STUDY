angular.module('app').
  filter('upper', function(){
    return function(input){
      return angular.uppercase(input);
    }
  })
;
