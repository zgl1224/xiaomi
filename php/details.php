<?php
  include('./mysql.php');
  $fn = $_GET['fn'];
  
  // echo $id;
  $fn();

  function lst(){
    $id = $_GET['id'];
    $sql = "select * from Product where id=$id";
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  };

  function add(){
    $userId = $_POST['userId'];
    $gdId = $_POST['gdId'];
    $gdNum = $_POST['gdNum'];
    $sql = "insert into cart(userId,productId,num) values('$userId','$gdId','$gdNum') on duplicate key update num=num+$gdNum";
    $res = query($sql);
    if($res==1){
      echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>''
      ]);
    }else{
        echo json_encode([
          'stateCode'=>200,
          'state'=>'success',
          'data'=>''
        ]);
    };
  }

?>