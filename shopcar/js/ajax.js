function ajax(options){
	options = options || {};
	//url一定要传入,不传入就退出
	if(!options.url){return;}
	options.type = options.type || 'get';//设置请求方法,如果没有传入,默认get

	//创建ajax对象
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		//ie 6,7,8
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//先把参数处理好,name=zhangsan&age=12;
	options.data = options.data||{};
	var arr = [];
	for(var key in options.data){
		arr.push(key+"="+options.data[key]);//["name=zhangsan","age=12"]
	}
	var str = arr.join('&');
	//建立连接
	if(options.type=="get"){
		xhr.open('get',options.url+"?"+str);
		//发送请求
		xhr.send();
	}else{
		xhr.open('post',options.url);
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		//发送请求
		xhr.send(str);
	}
	//接收响应
	xhr.onreadystatechange = function(){
		//完成
		if(xhr.readyState==4&&xhr.status==200){
			//有success函数再调用success函数,并把ajax获取到的数据转json作为实参传入
			options.success&&options.success(xhr.responseText);
		}
	}

}
