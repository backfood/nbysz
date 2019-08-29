<?php
    //设置响应头
    header("content-type:text/html;charset=utf-8");
    //接收get到的数据
    $name = $_REQUEST['mobile'];
    $password = $_REQUEST['passwordMobile'];

    //连接数据库
    $connect = mysqli_connect("localhost","root","root","user",3306);
    //检测是否成功连接数据库
    if(mysqli_connect_error()){
        die("数据库连接失败");
    }else{//数据库连接成功  
            $sqlInsert = "INSERT INTO userinfo (name,password) VALUES ('$name','$password')";
            mysqli_query($connect,$sqlInsert);
            echo "注册成功";
            echo "<a href='http://localhost/nubia/login.html'>请登录</a>";
    }
?>