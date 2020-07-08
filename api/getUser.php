<?php
    include_once('./controller/authentication.php');
    $auth = new Authentication();
    if (!empty($_REQUEST['user_id'])) {
        if ($_REQUEST['user_id'] != '0') {
            $auth->getUser();
            exit;
        }
    }
    
    if (!empty($_REQUEST['username'])) {
        if ($_REQUEST['username'] != '') {
            $auth->getUserByUsername();
            exit;
        }
    }

    $auth->getUsers();
    