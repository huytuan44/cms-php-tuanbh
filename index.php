<?php
    $request = $_SERVER['REQUEST_URI'];
    $pages = explode("?", $request);
    switch ($pages[0]) {
        case '/' :
            require __DIR__ . '/pages/index.php';
            break;
        case '/home' :
            require __DIR__ . '/pages/home.php';
            break;    
        case '' :
            require __DIR__ . '/pages/index.php';
            break;
        case '/login' :
            require __DIR__ . '/controller/login.php';
            break;    
        case '/about' :
            require __DIR__ . '/pages/about.php';
            break;
        default:
            require __DIR__ . '/pages/404.php';
            break;
    }