(function(){
	var xhr= new XMLHttpRequest();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./php/ajiax01.php");
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.send("commodity=water&price=123&num=2");
	xhr.onload = function() {
		//写入html
		var xgwc='';
		var car_price=0;
		var num_price=0;
		var price='';
		var res = JSON.parse(xhr.responseText);
		console.log(res);
		if(res[0]!=null){
		for (let i = 0; i < res.length; i++) {
			price=+res[i].price.split("¥").join('');
			num_price=price* +res[i].num;
			car_price+=num_price;
			xgwc+=`<li>
						<div class="gwc_left_img">
							<img src="${res[i].src}">
						</div>
						<div class="gwc_right_detial">
							<a href="">
								<p class="gwc_r_name">${res[i].name}]</p>
							</a>
							<span class="gwc_price">${res[i].price}</span>
							<span class="gwc_num">*${res[i].num}</span>
						</div>
					</li>`
		}
		$('#gwc_ul').html(xgwc);
		$('.tp_l').html("合计¥"+car_price) //总价
		$('#gwc_bought').css({
			'display':'block',
			'margin-top':-8
		});
		$('#gwc_empty').css('display', 'none');
		}else{
			$("#gwc_bought").css('display', 'none');
			$("#gwc_empty").css('display','block');
		}
	
	}
})()