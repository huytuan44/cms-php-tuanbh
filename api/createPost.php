<?php
    include("../controller/authentication.php");
    include("../controller/authorization.php");
    $post = new Post();
    $post->createPost();
