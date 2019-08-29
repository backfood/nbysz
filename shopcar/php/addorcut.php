<?php
header('content-type:text/html;charset=utf-8');
$conn = mysqli_connect('localhost','root','root','hh',3306);
if(mysqli_connect_error()){
	die ("connect error");
}
echo "2425354";
?>