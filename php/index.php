<?php
  include('./mysql.php');
  $fn = $_GET['fn'];
  $fn();

  
  function get(){
    $sql = 'select * from num1';
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  }

?>