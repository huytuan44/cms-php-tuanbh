<?php
    include_once('./controller/authentication.php');
    $auth = new Authentication();
    $auth->getUsers();