$(function(){

//导航条下拉
$("#list ul li").on("mouseenter",function(){
    $(this).children().last().stop(true);
    $(this).siblings().children().css({"color":"#ebeef2"});
    $(this).children().css({"color":"#999899"});
    if ($(this).children().first().text()=="手机"||$(this).children().first().text()=="红魔手机"||$(this).children().first().text()=="配件"||$(this).children().first().text()=="摄影"||$(this).children().first().text()=="nubia UI") {
        //$(this).siblings().children().has("div").hide();
        $(this).children().last().slideDown("1000");
        //console.log($(this).children().last());
    }
});
$("#list ul li").on("mouseleave",function(){
    $(this).children().has("div").stop(true);
    $(this).children().css({"color":"#ebeef2"});
    $(this).children().has("div").slideUp();
});



//个人中心与购物车下拉
$(".user_move").on("mouseenter",function(){
    $(this).children().last().stop(true);
    $(this).children().first().css({"background":"#f35c49"});
    $(this).children().last().show();
    
})
$(".user_move").on("mouseleave",function(){
    $(this).children().last().stop(true);
    $(this).children().first().css({"background":"#282828"});
    $(this).children().last().hide();

});



//个人中心字体
$("#user_home>ul>li").on("mouseenter",function(){
    $(this).children().css({"color":"#757575"});
});
$("#user_home>ul>li").on("mouseleave",function(){
    $(this).children().css({"color":"#f7f7f7"});
});


//底部倒数第二关于我们文字变色
$("#info_content dl dd").on("mouseenter",function(){
    $(this).children().css({"color":"#ea5f46"});
});
$("#info_content dl dd").on("mouseleave",function(){
    $(this).children().css({"color":"#929693"});
});


//微博图标变色
$("#footer p:eq(0) a:eq(0) span").on("mouseenter",function(){
    $(this).css({"color":"red"});
});

$("#footer p:eq(0) a:eq(0) span").on("mouseleave",function(){
    $(this).css({"color":"#9c9e9c"});
});


//微信图标
$("#footer p:eq(0) a:eq(1) span").on("mouseenter",function(){
    $(this).css({"color":"green"});
    $("#footer>img").show();
    $("#footer>#sanjiao").show();
});

$("#footer p:eq(0) a:eq(1) span").on("mouseleave",function(){
    $(this).css({"color":"#9c9e9c"});
    $("#footer>img").hide();
    $("#footer>#sanjiao").hide();
});




//最底部
//隐私政策,关于cookie变色
$("#footer p:eq(1) a").on("mouseenter",function(){
    $(this).css({"color":"#951b1b"});
});
$("#footer p:eq(1) a").on("mouseleave",function(){
    $(this).css({"color":"#9c9e9c"});
});



//简体中文变色
$("#footer p:eq(1) a:eq(2)").on("mouseenter",function(){
    $(this).css({"color":"#f3f2f3","background":"#b6b6b6"});
});
$("#footer p:eq(1) a:eq(2)").on("mouseleave",function(){
    $(this).css({"color":"#9c9e9c","background":"#e9e8e6"});
});


})