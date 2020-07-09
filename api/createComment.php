<?php
    include_once("./controller/comment.php");
    include("./controller/authorization.php");
    $comment = new Comment();
    $comment->createComment();