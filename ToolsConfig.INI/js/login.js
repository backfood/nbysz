//-------获取相应的登录方式--------
var tab_nav = $id('tab_nav');
var a = document.querySelectorAll('a');
var dl = document.querySelectorAll('dl');
//console.log(a,dl);
tab_nav.onclick = function(eve){
    var e = eve || event;
    var target = e.target || e.srcElement;
    if(target.nodeName.toLowerCase() == "a"){
        //排它思想
        for (var i = 0; i <= 1; i++) {
            //a[i].index = i;
            a[i].className = "";
            dl[i].style.display = "none";
        }
        target.className = "on";
        var index = target.getAttribute("index");//在行内设置自定义的index行内属性
        //alert(index);
        dl[index].style.display = "block";
        if(index == 0){//当index为0时，logButton显示，logButton2隐藏
            logButton.style.display = "block";
            logButton2.style.display = "none";
        }else{//当index为1时，logButton2显示，logButton隐藏
            logButton.style.display = "none";
            logButton2.style.display = "block";
        }
    }
}
//--------------------------------
var form = $id('form');
var userAccountFlag = false;
var userPasswordFlag = false;
var userMobileFlag = false;
var validateFlag = false;

// -------------账号登录的方式------------

//---账号的初步验证---
var mobiluserAccounte = $id("userAccount");
var error_userAccountnull = document.querySelectorAll(".error_tips")[0];
var error_userAccountfault = document.querySelectorAll(".error_tips")[1];
//失去焦点时，如果不符合验证要求，则提示不合法信息
userAccount.onblur = function () {
    var uVal = userAccount.value;
    //验证手机号是否合法
    if (uVal == '') {//如果账号为空，则提示空的错误提示
        userAccountFlag = false;
        error_userAccountnull.style.display = "inline-block";
        error_userAccountfault.style.display = "none";
    }else{
        userAccountFlag = true;
        error_userAccountfault.style.display = "none";
        error_userAccountnull.style.display = "none";
    }
}
//---密码的初步验证---
var userPassword = $id('userPassword');
var error_userPasswordnull = document.querySelectorAll(".error_tips")[2];
var error_userPasswordfault = document.querySelectorAll(".error_tips")[3];

//失去焦点时，如果不符合验证要求，提示不合法信息
userPassword.onblur = function(){
    var pVal = userPassword.value;
    //验证密码是否合法
    if(pVal == ''){//如果密码为空，则提示空的错误提示
        userPasswordFlag = false;
        error_userPasswordnull.style.display = "inline-block";
        error_userPasswordfault.style.display = "none";
    }else{
        error_userPasswordfault.style.display = "none";
        error_userPasswordnull.style.display = "none";
        userPasswordFlag = true;
    }
}

//---账号登录时验证用户信息---
var logButton = $id("logButton");
logButton.onclick = function(){
    if(userAccountFlag && userPasswordFlag){
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'userinfo_copy.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); 
        xhr.send('name=' + (userAccount.value) + '&password=' + (userPassword.value));
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                if (xhr.response == 1) {
                    mobileFlag = true;
                    error_userPasswordfault.style.display = "inline-block";
                    error_userAccountfault.style.display = "inline-block";
                   
                }
                if (xhr.response == 0) {
                    error_userPasswordfault.style.display = "none";
                    error_userAccountfault.style.display = "none";
                    alert("登录成功");
                }
            }
        }
    }
}



// -------------手机验证登录的方式------------

//---手机号的初步验证---
var userMobile = $id("userMobile");
var error_userMobilenull = document.querySelectorAll(".error_tips")[4];
var error_userMobilefault = document.querySelectorAll(".error_tips")[5];
var error_userMobileno = document.querySelectorAll(".error_tips")[6];
// console.log(error_null,error_fault);
var userMobileReg = /^1[3-9]\d{9}$/;
//var mobile_nullReg = /\s/;//空白字符正则

//失去焦点时，如果不符合验证要求，则提示不合法信息
userMobile.onblur = function () {
    
    var mVal = userMobile.value;
    //验证手机号是否合法
    if (mVal == '') {//如果手机号为空，则提示空的错误提示
        userMobileFlag = false;
        error_userMobilenull.style.display = "inline-block";
        error_userMobilefault.style.display = "none";
        error_userMobileno.style.display = "none";
    }else if(userMobileReg.test(mVal)){//如果手机号符合要求则将错误提示信息隐藏
        error_userMobilenull.style.display = "none";
        error_userMobilefault.style.display = "none";
        error_userMobileno.style.display = "none";
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'userinfo.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); 
        // xhr.send('username=' + username + '&password=' + password);
        xhr.send('name=' + mVal);
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                if (xhr.response == 1) {
                    userMobileFlag = false;
                    error_userMobilenull.style.display = "none";
                    error_userMobilefault.style.display = "none";
                    error_userMobileno.style.display = "inline-block";
                }
                if (xhr.response == 0) {
                    userMobileFlag = true;
                    error_mobilenull.style.display = "none";
                    error_mobilefault.style.display = "none";
                    error_mobilehas.style.display = "none";
                }
            }
        }
    }else{//以上两种情况都不满足，则表示手机号格式错误，相应提示信息显示
        userMobileFlag = false;
        error_userMobilefault.style.display = "inline-block";
        error_userMobilenull.style.display = "none";
        error_userMobileno.style.display = "none";
    }
    
}

//---手机验证码的初步验证---
var validateCode = $id('mobileValidateCode');
var btnCode = $id('btn-mobile-code')
var yz = $id("yz");
var error_validatenull = document.querySelectorAll(".error_tips")[7];
var error_validatefault = document.querySelectorAll(".error_tips")[8];
showYZ();
function showYZ(){
	yz.innerHTML = getYZM(6);
}
btnCode.onclick = function(){
    if(userMobileFlag){
        yz.style.display = "inline-block";
        error_validatefault.style.display = "none";
        error_validatenull.style.display = "none";
	    showYZ();
    }  
};    
// btnCode.onclick = showYZ;
validateCode.onblur = function(){
    if(userMobileFlag){
        yz.style.display = "none";
        if(validateCode.value == ''){
            validateFlag = false;
            error_validatenull.style.display = "inline-block";
            error_validatefault.style.display = "none";
        }else if(validateCode.value == yz.innerHTML){
            validateFlag = true;
            error_validatefault.style.display = "none";
            error_validatenull.style.display = "none";
        }else{
            validateFlag = false;
            error_validatefault.style.display = "inline-block";
            error_validatenull.style.display = "none";
        }
    }
}

//---手机验证码登录时验证用户信息---
var logButton2 = $id('logButton2');
logButton2.onclick = function(){
    if(userMobileFlag && validateFlag){
        alert("登录成功");
    }
}


