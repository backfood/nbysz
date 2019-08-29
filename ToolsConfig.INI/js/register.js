var form = $id('form');
var mobileFlag = false; //true时手机号验证通过
var passwordFlag = false;
var validateFlag = false;

// -------手机号码验证---------
var mobile = $id("mobile");
var error_mobilenull = document.querySelectorAll(".error_tips")[0];
var error_mobilefault = document.querySelectorAll(".error_tips")[1];
var error_mobilehas = document.querySelectorAll(".error_tips")[2];
// console.log(error_null,error_fault);
var mobileReg = /^1[3-9]\d{9}$/;
//var mobile_nullReg = /\s/;//空白字符正则

//失去焦点时，如果不符合验证要求，则提示不合法信息
mobile.onblur = function () {
    var mVal = mobile.value;
    //验证手机号是否合法
    if (mVal == '') {//如果手机号为空，则提示空的错误提示
        mobileFlag = false;
        error_mobilenull.style.display = "inline-block";
        error_mobilefault.style.display = "none";
    }else if(mobileReg.test(mVal)){//如果手机号符合要求则进一步验证
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'userinfo.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); 
        // xhr.send('username=' + username + '&password=' + password);
        xhr.send('name=' + mVal);
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                if (xhr.response == 1) {
                    mobileFlag = true;
                    error_mobilenull.style.display = "none";
                    error_mobilefault.style.display = "none";
                    error_mobilehas.style.display = "none";
                }
                if (xhr.response == 0) {
                    mobileFlag = false;
                    error_mobilenull.style.display = "none";
                    error_mobilefault.style.display = "none";
                    error_mobilehas.style.display = "inline-block";
                }
            }
        }
    }else{//以上两种情况都不满足，则表示手机号格式错误，相应提示信息显示
        mobileFlag = false;
        error_mobilefault.style.display = "inline-block";
        error_mobilenull.style.display = "none";
    }
}


// -------密码验证---------
var password = $id('passwordMobile');
var error_pwdnull = document.querySelectorAll(".error_tips")[3];
var error_pwdfault = document.querySelectorAll(".error_tips")[4];
var passwordReg = /^\w{6,16}$/;
var pReg2 = /[a-zA-Z0-9]/;
var q3Reg1 = /[a-z]/;
var q3Reg2 = /[A-Z]/;
var q3Reg3 = /[0-9]/;

//失去焦点时，如果不符合验证要求，提示不合法信息
password.onblur = function(){
    var pVal = password.value;
    //验证密码是否合法
    if(pVal == ''){//如果密码为空，则提示空的错误提示
        passwordFlag = false;
        error_pwdnull.style.display = "inline-block";
        error_pwdfault.style.display = "none";
    }else if(passwordReg.test(pVal)&&(((pVal.search(q3Reg1) != -1 && pVal.search(q3Reg2) != -1) || (pVal.search(q3Reg1) != -1 && pVal.search(q3Reg3) != -1) || (pVal.search(q3Reg2) != -1 && pVal.search(q3Reg3) != -1))||(pVal.search(q3Reg1) != -1 && pVal.search(q3Reg2) != -1 && pVal.search(q3Reg3) != -1))){//如果密码符合要求则将错误提示信息隐藏
        passwordFlag = true;
        error_pwdnull.style.display = "none";
        error_pwdfault.style.display = "none";
    }else{//以上两种情况都不满足，则表示密码格式错误，相应提示信息显示
        error_pwdfault.style.display = "inline-block";
        error_pwdnull.style.display = "none";
        passwordFlag = false;
    }
}


//验证码
var validateCode = $id('mobileValidateCode');
var btnCode = $id('btn-mobile-code')
var yz = $id("yz");
var error_validatenull = document.querySelectorAll(".error_tips")[5];
var error_validatefault = document.querySelectorAll(".error_tips")[6];
showYZ();
function showYZ(){
	yz.innerHTML = getYZM(6);
}
btnCode.onclick = function(){
    if(mobileFlag){
        yz.style.display = "inline-block";
        error_validatefault.style.display = "none";
        error_validatenull.style.display = "none";
	    showYZ();
    }
};    
// btnCode.onclick = showYZ;
validateCode.onblur = function(){
    if(mobileFlag){
        yz.style.display = "none";
        if(validateCode.value == ''){
            validateFlag = false;
            error_validatenull.style.display = "inline-block";
         error_validatefault.style.display = "none";
        }else if(validateCode.value ==  yz.innerHTML){
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

//最后的表单提交
//var regButton = $id('regButton');
form.onsubmit = function(){
    //console.log(1);
    var agreement = $id("agreement").checked;
    //console.log(agreement);
    //表单验证只要有一个未通过验证，无法提交
    //if(手机验证通过&&密码通过&&验证码通过){
    if(mobileFlag && passwordFlag && validateFlag){
        if(agreement){
            alert("注册中，请稍等......");
            return true;
        }else{
            //console.log(222);
            alert('请先阅读并接受用户协议和隐私政策');
            return false;
        } 
    }else{
        alert("请先正确完成填写必要的注册信息");
    }
}
