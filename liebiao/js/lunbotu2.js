$(function(){
	var timer=setInterval(play,2000);
	var index=0;
	var $poxL=$('#lxr-pox').children().length;
	var $pox=$('#lxr-pox').children();
	var $dd=$('.lxr-dd').children();
	//轮播
	function play(){
		index++;
		if(index==$poxL){
			index=0;
		}
		$pox.eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$dd.eq(index).addClass('current').siblings().removeClass('current');
	}
	//轮播图end
	
	 var page = 1;
	var pageSize = 12;
	//请求首屏数据
	function getData(){
	    $.ajax({
	        url:"http://localhost:8888",
	        data:{
	            page:page,
	            pageSize:pageSize
	        },
	        dataType:'jsonp',
	        success:function(data){
	            //根据获取的数据渲染页面
	            renderHTML(data)
	        }
	    })
	}
	//把数据渲染到页面上
	function renderHTML(data){
	    var html = template('lxr-item',{json:data});
	    $('.lxr-items').append(html);
	}
	getData();
	
	 //滚动刷新商品
	$(window).scroll(function(){
	   var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
	   var scrollHeight = $(document).height();   //当前页面的总高度
	   var clientHeight = $(this).height();    //当前可视的页面高度
	   if(scrollTop + clientHeight >= scrollHeight-384){
		page++;
		getData()
		console.log(page)
	   }else if(page==7){
		   $('#lxr-ml').show();
	   }
	});
	//鼠标移上移出动画
	$(".lxr-items").on("mouseenter","#tiao",function(){
		$(this).animate({"top":"-10px"},100);
	})
	$(".lxr-items").on("mouseleave","#tiao",function(){
		$(this).animate({"top":"0px"},100);
	})
	
	$(".lxr-items").on("mouseenter","#lxr-xq",function(){
		
		$(this).children().has("button").show();
	})
	$(".lxr-items").on("mouseleave","#lxr-xq",function(){
		$(this).children().has("button").hide();
	})
	
	
});

			
			
	