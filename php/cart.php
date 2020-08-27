<?php
  include('./mysql.php');
  $fn = $_GET['fn'];
  $fn();

  function getgdId(){
    $userId = $_GET['userId'];
    // echo $userId;
    $sql = "select productId,num from cart where userId='$userId'";
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  };

  function lst(){
    $id = $_POST['gdId'];
    $id = substr($id,0,strlen($id)-1);
    $sql = "select * from product where id in ($id)";
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  };


  function update(){
    $gdId = $_GET['gdId1'];
    $gdNum = $_GET['gdNum1'];
    $userId = $_GET['userId1'];
    // echo $gdId;
    // echo $gdNum;
    // echo $userId;
    $sql = "update cart set num='$gdNum' where productId='$gdId' and userId='$userId'";
    $res = query($sql);
    if($res == 1){
      echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>''
      ]);
    }else{
      echo json_encode([
        'stateCode'=>201,
        'state'=>'success',
        'data'=>''
      ]);
    };
  };


  function delGd(){
    $gdId = $_GET['gdId'];
    $userId = $_GET['userId'];
    // echo $gdId;
    // echo $userId;
    $sql = "delete from cart where productId='$gdId' and userId='$userId'";
    $res = query($sql);
    if($res==1){
      echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>''
      ]);
    }else{
        echo json_encode([
          'stateCode'=>201,
          'state'=>'success',
          'data'=>''
        ]);
    };
  }

  function Change(){
    $NNN = $_GET['NNN'];
    $sql = "update num1 set num='$NNN'";
    $res = query($sql);
    if($res==1){
      echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>''
      ]);
    }else{
        echo json_encode([
          'stateCode'=>201,
          'state'=>'success',
          'data'=>''
        ]);
    };
  }



?>