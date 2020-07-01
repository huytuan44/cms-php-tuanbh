<?php
    include('./core/controller.php');
    include('./core/connection.php');
    class Post extends Controller {
        private $request = '';
        private $table = 'post';
        public function __construct() {
            $this->request  = $_REQUEST;
        }
        public function getPosts() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $posts = $conn->select('*', $this->table, null, $this->table.'.created_at desc')->join('user', 'user_id')->get();
            
            $this->ajaxResponse('get posts success', $posts);
        }

        public function getPostsByChannel() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $channel_id = $this->request['channel_id'];
            $conn = new Connection();
            $where = "channel_id = {$channel_id}";
            $posts = $conn->select('*', $this->table, $where, $this->table.'.created_at desc')->join('user', 'user_id')->get();
            
            $this->ajaxResponse('get posts success', $posts);
        }

        public function getPost() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $post_id = $this->request['post_id'];
            $conn = new Connection();
            $where = "id = {$post_id}";
            $posts = $conn->select('*', $this->table, $where)->join('user', 'user_id')->get();
            
            $this->ajaxResponse('get posts success', $posts);
        }

        public function createPost() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $title = $this->request['title'];
            $content = $this->request['content'];
            $img_url = $this->request['img_url'];
            $user_id = $this->request['user_id'];
            $channel_id = $this->request['channel_id'];
            if(empty($title) || empty($user_id) || empty($channel_id)) {
                $this->ajaxError();
            }
            
            $conn = new Connection();
            $collumns = array('title', 'content', 'img_url', 'user_id', 'channel_id');
            $post = array(
                $title, 
                $content, 
                $img_url, 
                $user_id, 
                $channel_id
            );
            $results = $conn->insert($this->table, $collumns, $post);
            
            $results ? $this->ajaxResponse('created post success') : $this->ajaxError('created post error');
        }

        public function editPost() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $post_id = $this->request['id'];
            $title = $this->request['title'];
            $content = $this->request['content'];
            $img_url = $this->request['img_url'];
            $channel_id = $this->request['channel_id'];
            if(empty($title) || empty($user_id) || empty($channel_id)) {
                $this->ajaxError();
            }

            $conn = new Connection();
            $sets = array(
                "title = '{$title}'",
                "content = '{$content}'",
                "img_url = '{$img_url}'",
                "channel_id ={$channel_id}"
            );
            $where = "id = {$post_id}";
            $results = $conn->update($this->table, $sets, $where);
            
            $results ? $this->ajaxResponse('signup success') : $this->ajaxError('signup error');
        }

        public function deletePost() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $post_id = $this->request['id'];
            $conn = new Connection();
            $results = $conn->delete($this->table, "id = {$post_id}");
            
            $results ? $this->ajaxResponse('deleted post success!') : $this->ajaxError('deleted post error!');
        }
    }