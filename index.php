<?php
$request = $_SERVER['REQUEST_URI'];
$path = explode("/", $request);
if (count($path) > 2) {
    $pages = explode("?", $path[2])[0];
}
if (strpos($path[1], '?')) 
{ 
    $path[1] = substr($path[1], 0, strpos($path[1], '?')); 
}

switch ($path[1]) {
    case '':
        require __DIR__ . '/pages/index.html';
        break;
    case 'post':
        require __DIR__ . '/pages/post.html';
        break;
    case 'channel':
        require __DIR__ . '/pages/channel.html';
        break;
    case 'image':
        require __DIR__ . '/pages/image.html';
        break;            
    case 'about':
        require __DIR__ . '/pages/about.php';
        break;
    case 'api':
        require __DIR__ . '/api/'.$pages.'.php';
        break;
    case 'admin':  
        require __DIR__ . '/pages/admin/'.$pages.'.html';
        break;   
    default:
        require __DIR__ . '/pages/404.php';
        break;
}
