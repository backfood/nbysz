<?php
    //设置响应头
    header("content-type:text/html;charset=utf-8");
    //接收get到的数据
    $name = $_REQUEST['name'];
    $password = $_REQUEST['password'];

    //连接数据库
    $connect = mysqli_connect("localhost","root","root","user",3306);
    //检测是否成功连接数据库
    if(mysqli_connect_error()){
        die("数据库连接失败");
    }else{//数据库连接成功
        $result = mysqli_query($connect,"SELECT * FROM userinfo WHERE name='$name' and password='$password'");
        $row = mysqli_num_rows($result);
        if($row > 0){//账户已存在
            echo '0';
        }else{      
            echo '1';//账户不存在
        }
    }
?>