<?php
    include("./controller/post.php");
    include("./controller/authorization.php");
    $post = new Post();
    if(!empty($_FILES)) {
        $post->saveImage();
        exit;
    } 
    $post->createPost();
