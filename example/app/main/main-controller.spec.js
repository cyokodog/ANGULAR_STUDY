describe('MainControllerのテスト', function(){
    beforeEach(module('app'));

    //事前にMainControllerを実行する
    var scope, ctrl;
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      ctrl = $controller('MainController', {$scope: scope});
    }));

    describe('scope.items', function() {
      it('itemsに配列が追加されること', function() {

        scope.item = 'abc';
        ctrl.addItem();

        scope.item = 'efg';
        ctrl.addItem();

        expect(ctrl.items).toEqual(['abc','efg']);
      });
    });

})