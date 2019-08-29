<?php
//此页加载数据库内含有的商品
header('content-type:text/html;charset=utf-8');
// echo json_encode($_POST);
$conn = mysqli_connect('localhost','root','root','hh',3306);
if(mysqli_connect_error()){
	die ("connect error");
}
$sqlSelect = 'SELECT * FROM cart';//查询语句
$value= mysqli_query($conn,$sqlSelect);//返回查询到的数据
$num = mysqli_num_rows($value);//返回行的数目
$res_data=array();
if($num>0){
	while($num>0){
		$row = mysqli_fetch_assoc($value);//查询当前行,完成后自动移动到下一行,返回当前行的数据
		array_push($res_data,$row);
		$num--;
	}
}else{
		array_push($res_data,null);
	}
	echo json_encode($res_data);
	
?>