<?php
  include('./mysql.php');
  $fn = $_GET['fn'];
  $fn();

  function look(){
    $sql = 'select * from accounts';
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  };


?>