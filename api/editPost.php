<?php
    include("./controller/post.php");
    include("./controller/authorization.php");
    $post = new Post();
    $post->editPost();