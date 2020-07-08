<?php
    include_once("./controller/comment.php");
    include("./controller/authorization.php");
    $comment = new Comment();
    if (!empty($_REQUEST['post_id'])) {
        if ($_REQUEST['postpost_id'] === '0') {
            $comment->getCommentByPost();
            exit;
        }
    }

    $comment->getComments();