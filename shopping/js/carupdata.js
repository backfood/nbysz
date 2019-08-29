(function(){
	//$("#empty").css('display','none');
	
	/*===============测试服务器+PHP响应=================*/
	var xiaoji = function() {
		var car = document.getElementById("car");
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "./php/ajiax01.php");
		//这里表示的是发送给服务器的编码方式
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send("commodity=water&price=123&num=2");
		xhr.onload = function() {
			//写入html
			var ihtml='';
			var res = JSON.parse(xhr.responseText);
			// console.log(res[0])
			// console.log(res.length)
			if(res[0]!=null){
			for (let i = 0; i < res.length; i++) {
				// console.log(res[i].name);
				// console.log(res[i].src);
				ihtml+=`<tr>
						<td>
							<div id="car_pic" >
								<img  src="${res[i].src}">
							</div>
						</td>
						<td>
							<p><a href="">${res[i].name}</a></p>
						</td>
						<td class="danjia">${res[i].price}</td>
						<td>
							<div id="car_btn">
								<span id="btn_cut" class="btn_cut">
									-
								</span>
								<span id="btn_num">
									${res[i].num}
								</span>
								<span id="btn_add" class="btn_add">
									+
								</span>
							</div>
						</td>
						<td></td>
						<td>
							<a title="删除" class="cart_close ">×</a>
						</td>
					</tr>`
			}
			$('#car_tbody').html(ihtml);
			heji();
			// console.log("这是陈宫写入")
			}else{
				// console.log("未成功写入")
				$("#car").css('display', 'none');
				$("#empty").css('display','block');
			}
		}
	}
	xiaoji();
	/*======================以下为公共方法===============================*/
	//解决\u编码转汉字问题
	function unescapeF(str) {
		return unescape(str.replace(/\\/g, "%"))
	}
	/*============以下解决购物车互动的问题==============*/
	var heji =  function(){
		/*=============================购物车数量加减与结算===================*/
		var x_mony = "";
		var xiaoji = function(){
			var car_num = 0;
			var car_price = 0;
			var danjia = document.querySelectorAll(".danjia");
			for (let i = 0; i < danjia.length; i++) {
				let xj = 0;
				let dj = +danjia[i].innerText.substr(1);
				let num = +$(danjia[i]).next().children().children("#btn_num").text();
				car_num += num;
				xj = dj * num;
				xj = xj.toFixed(2);//转为string
				car_price += +xj;
				$(danjia[i]).next().next().html("¥" + xj)
			}
			/*==========合计总价========*/
			$('.zhongji').text("¥"+car_price);
			$('.zhongji').css('text-align','left')
			/*==========合计总量========*/
			$('#c_num span').eq(1).text(car_num);
			/*======判断是否删除/隐藏购物车========*/
			if (car_num == 0) {
				$("#car").css('display', 'none');
				$("#empty").css('display','block');
			}
			return {
				car_num: car_num,
				car_price: car_price
			};
		}
		var cart = xiaoji();//初次计算总价/总量
		/*以下为判断单个商品是否应当删除*/
		/*挣扎使用jQuery选择器遍历*/
		$('.btn_cut').click(function(){
			
			var num = $(this).next().text();
			num--;
			if (num<= 0){
				if (confirm('是否取消购买该商品')) {
					var namer=$(this).parent().parent().prev().prev().children().children().text().trim();
					rmtr(namer);//去除本行
					console.log(namer);
				} else {
					num=1;
				}
			}else{
				$(this).next().text(num);
				var name=$(this).parent().parent().prev().prev().children().children().html().trim();
				var src=$(this).parent().parent().prev().prev().prev().children().children()[0].src;
				var price=$(this).parent().parent().prev().text().trim();
				//console.log(name,src);
				//console.log(this);
				var xhr=new XMLHttpRequest;
				xhr.open("POST", "php/cart_send.php");
				xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
				xhr.send(`name=${name}&price=${price}&num=${num}&src=${src}`);
				xiaoji()
			}
			
		})
		$('.btn_add').click(function() {
			var num = $(this).prev().text();
			num++;
			$(this).prev().text(num);
			var name=$(this).parent().parent().prev().prev().children().children().html().trim();
			var src=$(this).parent().parent().prev().prev().prev().children().children()[0].src;
			var price=$(this).parent().parent().prev().text().trim();
			//console.log(name,src);
			var xhr=new XMLHttpRequest;
			xhr.open("POST", "php/cart_send.php");
			xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			xhr.send(`name=${name}&price=${price}&num=${num}&src=${src}`);
			xiaoji()
		})
		$('.cart_close').click(function() {
			if (confirm("您确定不购买该商品")){
				this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
				var namer= $(this).parent().siblings('.danjia').prev().children().children().text().trim();
				//console.log(namer);
				rmtr(namer);
				xiaoji();
			}
		})
	}
	// heji();
	var rmtr=function(namer){
		console.log('函数知悉了')
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "php/retr.php");
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(`name=${namer}`);
		xhr.onload=function(){
			console.log(xhr.response);
			xiaoji();//更新当前计算
		}
	}
})()