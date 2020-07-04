<?php
    include_once('./controller/authentication.php');
    $auth = new Authentication();
    if (!empty($_REQUEST['user_id']) || $_REQUEST['user_id'] == 0) {
        $auth->getUser();
    } else {
        $auth->getUsers();
    }