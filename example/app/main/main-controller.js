;(function(){
  angular.module('app').controller('MainController', MainController)
  function MainController($scope){
    this.items = []
    this.addItem = function(){
      this.items.push($scope.item);
    }
  }  
})();
