<?php
    include_once('./controller/authentication.php');
    $auth = new Authentication();
    if (!empty($_REQUEST['user_id'])) {
        $auth->getUser();
    } else {
        $auth->getUsers();
    }