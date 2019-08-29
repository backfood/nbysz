$(function(){
			var $imgLength=$('#lxr-box li').length;//图片长度
			var $li=$('#lxr-box li');//图片
			var $dLength=$('.lxr-d li').length;//小豆豆
			var $d=$('.lxr-d li');//小豆豆
			var index=0;
			var timer=setInterval(play,2000);
			//轮播动画
			function play(){
				index++;
				if(index==$imgLength){
					index=0;
				}
				$li.eq(index).fadeIn(1000).siblings().fadeOut(1000);//淡入淡出
				$d.eq(index).addClass('now').siblings().removeClass('now');//添加移除
			}
			//轮播按钮鼠标移入动画
			$("#l-prev").on("mouseenter",function(){
				$(this).animate({"background-position": "0"});
				clearInterval(timer);
				
			});
			
			$("#r-next").on("mouseenter",function(){
				$(this).animate({"background-position": "-42"});
				clearInterval(timer);
			});
			
			//鼠标移出
			$("#l-prev").on("mouseleave",function(){
				$(this).animate({"background-position": "-83"});
				timer=setInterval(play,2000)
				
			});
			
			$("#r-next").on("mouseleave",function(){
				$(this).animate({"background-position": "-125"});
				timer=setInterval(play,2000)
			});
			//鼠标点击事件
			$("#l-prev").on("click",function(){
				index--;
				if(index==-1){
					index=3;
				}
				$li.eq(index).fadeIn(1000).siblings().fadeOut(1000);
				$d.eq(index).addClass('now').siblings().removeClass('now');
			});
			$("#r-next").on("click",function(){
				index++;
				if(index==4){
					index=0;
				}
				$li.eq(index).fadeIn(1000).siblings().fadeOut(1000);
				$d.eq(index).addClass('now').siblings().removeClass('now');
			});
			
			
		//列表商品切换显隐;
		var $lL=$('#lxr-l').children().children();
		var $xh=$('#lxr-xh').children();
		for(let j=0;j<$lL.length;j++){
			$lL.eq(j).on("mouseenter",function(){
				$(this).addClass("bG")
				$(this).parent().siblings().children().removeClass("bG");//鼠标移上字体变红色
				$xh.eq(j).show();
				$xh.eq(j).siblings().hide();
			});
		}
		//列表移上移出;
			$("#l").on("mouseenter",function(){
				$("#r").show();
			});
			$("#liebiao").on("mouseleave",function(){
				$("#r").hide();
				$lL.removeClass('bG');
			});

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



});


			