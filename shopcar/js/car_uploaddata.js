(function(){
	var name=$('#name').children().children().html();
	var price=$("#price").html().trim();
	var num=$("#c_num").html().trim();
	var src=$('#src').children('img')[0].src;
		var xhr=new XMLHttpRequest;
		xhr.open("POST", "../php/cart_send.php");
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(`name=${name}&price=${price}&num=${num}&src=${src}`);
		// xhr.onload=function(){
		// 	var res = JSON.parse(xhr.responseText)
		// 	console.log(res);
		// }
})()
