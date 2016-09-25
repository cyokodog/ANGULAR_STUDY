//config
;(function(){
  angular.module('app').config(config);
  function config(){
    console.log('Config');
    console.log(this.isNew ? 'newされる' : 'newされない');
  }
  config.prototype.isNew = true;
})();

//controller
;(function(){
  angular.module('app').controller('NewCheckController', Controller)
  function Controller(
    NewCheckFactory,
    NewCheckService
  ){
    console.log('Controller');
    console.log(this.isNew ? 'newされる' : 'newされない');
    this.factoryMsg = NewCheckFactory.getMessage();
    this.serviceMsg = NewCheckService.getMessage();
  }  
  Controller.prototype.isNew = true;
})();

//directive
;(function(){
  angular.module('app').directive('newCheckDirective', directiveFactory);
  function directiveFactory(){
    console.log('Directive');
    console.log(this.isNew ? 'newされる' : 'newされない');
    return new Directive('directive()にはdirectiveのfactory関数を指定します');
  }
  directiveFactory.prototype.isNew = true;

  function Directive(msg){
    this.msg = msg;
  }
  Directive.prototype = {
    template: function(){
      return '<strong>'+this.msg+'</strong>'
    }
  }
})();

//factory
;(function(){
  angular.module('app').factory('NewCheckFactory', serviceFactory)
  function serviceFactory(){
    console.log('Factory');
    console.log(this.isNew ? 'newされる' : 'newされない');
    return new Service('factory()にはserviceのfactory関数を指定します');
  }  
  serviceFactory.prototype.isNew = true;

  function Service(msg){
    this.msg = msg;
  }
  Service.prototype = {
    getMessage: function(){
      return this.msg;
    }
  }
})();

//service
;(function(){
  angular.module('app').service('NewCheckService', Service)
  function Service(){
    console.log('Service');
    console.log(this.isNew ? 'newされる' : 'newされない');
    this.msg = 'service()にはserviceのコンストラクタを指定します'
  }
  Service.prototype = {
    isNew: true,
    getMessage: function(){
      return this.msg;
    }
  }
})();








