<?php
header('content-type:text/html;charset=utf-8');
$conn = mysqli_connect('localhost','root','root','hh',3306);
if(mysqli_connect_error()){
	die ("connect error");
}
$price=$_POST['price'];
$num=$_POST['num'];
$name=$_POST['name'];
$src=$_POST['src'];
// echo $num,$num;
//$query='slect * from cart';
$query="SELECT * FROM cart WHERE name='$name'";
//$flag=mysqli_query($conn,$query);
$value= mysqli_query($conn,$query);
//echo $_POST['name'];//这一行可以获取指定的内容
if(mysqli_num_rows($value)>0){
	$sqlUpdate = "UPDATE cart SET num='$num' WHERE name='$name'";
	mysqli_query($conn,$sqlUpdate);
	echo "已插入";
	echo $name;
	if($price){
		$sqlUpdate = "UPDATE cart SET price='$price' WHERE name='$name'";
		mysqli_query($conn,$sqlUpdate);
	}
}else{
	echo "未插入";
	//$insert="insert into cart (name,price,src,num) values ($name,$price,$src)";
	$insert = "INSERT INTO cart (price,num,name,src) VALUES ('$price','$num','$name','$src')";
	$inser = mysqli_query($conn,$insert);
	// echo $inser;
}

/* $query="SELECT * FROM cart WHERE name='$name'";
$value= mysqli_query($conn,$query);
$num_row = mysqli_num_rows($value);//查询结果的行数
if($num_row>0){
	while($num_row>0){
		echo json_encode(mysqli_fetch_assoc($value));
		$num_row--;
	}
}else{
	echo '没找到';
} */
	
	
	
	
//echo mysqli_num_rows($value);




?>