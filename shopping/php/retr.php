<?php
header('content-type:text/html;charset=utf-8');
$conn = mysqli_connect('localhost','root','root','hh',3306);
if(mysqli_connect_error()){
	die ("connect error");
}



$name=$_POST['name'];
$sqlDelect = "DELETE FROM cart WHERE name='$name'";
$result = mysqli_query($conn,$sqlDelect);
echo $name;
?>