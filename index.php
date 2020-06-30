<?php
define('BASE_URL', 'https://cms-php.local/');
$request = $_SERVER['REQUEST_URI'];

$pages = explode("/", $request);
switch ($pages[1]) {
    case 'home':
        require __DIR__ . '/pages/home.php';
        break;
    case '':
        require __DIR__ . '/pages/index.php';
        break;
    case 'about':
        require __DIR__ . '/pages/about.php';
        break;
    case 'api':
        require __DIR__ . '/api/'.$pages[2].'.php';
        break;
    default:
        require __DIR__ . '/pages/404.php';
        break;
}
