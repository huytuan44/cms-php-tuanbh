<?php
    include_once("./controller/image.php");
    include("./controller/authorization.php");
    $image = new Image();
    if(!empty($_REQUEST['image_id'])) {
        $post->getImage();
        exit;
    }
    $image->getImages();