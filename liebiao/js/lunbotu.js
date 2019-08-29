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
		});