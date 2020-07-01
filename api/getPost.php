<?php
    include_once("./controller/post.php");
    include("./controller/authorization.php");
    $post = new Post();
    if(!empty($_REQUEST['channel_id'])) {
        $post->getPostsByChannel();
        exit;
    }
    if(!empty($_REQUEST['post_id'])) {
        $post->getPost();
        exit;
    }
    $post->getPosts();