<?php
    include_once("./controller/post.php");
    include("./controller/authorization.php");
    $post = new Post();
    if(!empty($_REQUEST['channel_id']) || $_REQUEST['channel_id'] === '0') {
        $post->getPostsByChannel();
        exit;
    }
    if(!empty($_REQUEST['post_id']) || $_REQUEST['post_id'] === '0') {
        $post->getPost();
        exit;
    }
    $post->getPosts();