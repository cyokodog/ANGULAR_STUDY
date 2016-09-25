describe('upper filterのテスト', function(){
    beforeEach(module('app'));
    it('大文字に変換される', 
        inject(
            function($filter){
                var upperFilter = $filter('upper');
                expect(upperFilter('hello')).toEqual('HELLO')
            }
        )
    )
})