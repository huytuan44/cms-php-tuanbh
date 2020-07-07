<?php
    include('./core/controller.php');
    include('./core/connection.php');
 class Comment extends Controller {
    private $request = [];
    private $table = 'comment';
    public function __construct() {
        $this->request  = $_REQUEST;
    }

    public function getCommentByPost() {
        if($_SERVER['REQUEST_METHOD'] != 'GET') {
            $this->ajaxError();
        }
        $post_id = $this->request['post_id'];
        $conn = new Connection();
        $where = "post_id = {$post_id} AND parrent_comment = 0";
        $comments = $conn->select("{$this->table}.*, user.username, user.email", $this->table, $where)->join('user', 'user_id')->get();
        foreach( $comments as $key => $comment) {
            $where = "post_id = {$post_id} AND parrent_comment = {$comment['id']}";
            $childComment = $conn->select("{$this->table}.*, user.username, user.email", $this->table, $where)->join('user', 'user_id')->get();
            $comments[$key]['childComment'] = $childComment;
        }
        $this->ajaxResponse('get comments success', $comments);
    }
    
    public function getComments() {

    }
 }    