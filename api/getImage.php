<?php
    include_once("./controller/image.php");
    include("./controller/authorization.php");
    $image = new Image();
    if(!empty($_REQUEST['image_id']) || $_REQUEST['image_id'] === '0') {
        $image->getImage();
        exit;
    }
    $image->getImages();