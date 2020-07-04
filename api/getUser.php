<?php
    include_once('./controller/authentication.php');
    $auth = new Authentication();
    if (!empty($_REQUEST['user_id']) || $_REQUEST['user_id'] == '0') {
        var_dump($_REQUEST['user_id'] == 0);die;
        $auth->getUser();
    } else {
        $auth->getUsers();
    }