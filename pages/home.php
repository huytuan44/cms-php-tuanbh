<?php
    require("./connection.php");

    $conn = new Connection();
    $data = $conn->select('*', 'user');
    $res = array(
        "status" => 'ok',
        "code" => 200,
        "data" => $data
    );
    echo json_encode($res);