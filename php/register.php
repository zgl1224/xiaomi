<?php
  include('./mysql.php');
  $fn = $_GET['fn'];
  $fn();

  function lst(){
    $sql = 'select * from accounts';
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  };


  function adduser(){
    $user = $_POST['user'];
    $password = $_POST['password'];
    $sql = "insert into accounts value('$user','$password',null)";
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
?>