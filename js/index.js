
var saveChildren = [];
$('.ex-code-prettify').each(function(){
	var target = $(this);
	var children = target.children();
	children.appendTo('body');
	saveChildren.push(children)
})
$('.markdown').each(function(){
	var target = $(this);
	target.html(marked(target.html()))
});

$('.ex-code-prettify').each(function(i){
	var target = $(this);
	var children = saveChildren[i];
	children.appendTo(target);
})
$('.ex-code-prettify').each(function(i){
	var target = $(this);
	$('<style/>').html($('.css').val()).prependTo('body');
	var demo = $('<div class="demo-html"/>').html(target.find('.html').val()).prependTo(target)
	target.find('.code').exCodePrettify({showDemo:false})
	target.find('div.demo-area').show().append(demo)
	$('.ex-code-prettify-hide-demo').removeClass('ex-code-prettify-hide-demo')
	eval(target.find('.script').val())
})


$('pre').each(function(){
	var s = $(this)
	if(!s.parents('.ex-code-prettify').size()){
		s.exCodePrettify({showDemo:true})
	}
})

