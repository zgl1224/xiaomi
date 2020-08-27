<?php
  include('./mysql.php');
  $fn = $_GET['fn'];
  $fn();

  function lst(){
    $sql = 'select * from Product';
    $data = select($sql);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  };



  
?>