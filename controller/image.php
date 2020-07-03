<?php
    include('./core/controller.php');
    include('./core/connection.php');
    class Image extends Controller {
        private $request = [];
        private $table = 'image';
        public function __construct() {
            $this->request  = $_REQUEST;
            $this->file = $_FILES; 
        }

        public function getImages() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $posts = $conn->select('*', $this->table, null, $this->table.'.created_at desc')
                        ->join('user', 'user_id')
                        ->join('channel', 'channel_id')
                        ->get();
            
            $this->ajaxResponse('get images success', $posts);
        }

        public function getImage() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $image_id = $this->request['image_id'];
            $where = $this->table.".id = {$image_id}";
            $posts = $conn->select('*', $this->table, $where, $this->table.'.created_at desc')
                        ->join('user', 'user_id')
                        ->join('channel', 'channel_id')
                        ->get();
            
            $this->ajaxResponse('get images success', $posts);
        }

        public function createImage() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $title = $this->request['title'];
            $img_url = $this->request['img_url'];
            $user_id = $this->request['user_id'];
            $channel_id = $this->request['channel_id'];
            if(empty($title) || empty($user_id) || empty($channel_id)) {
                $this->ajaxError();
            }
            
            $conn = new Connection();
            $collumns = array('title', 'url', 'user_id', 'channel_id');
            $image = array(
                $title, 
                $img_url, 
                $user_id, 
                $channel_id
            );
            $results = $conn->insert($this->table, $collumns, $image);
            
            $results ? $this->ajaxResponse('created image success') : $this->ajaxError('created image error');
        }

        public function editImage() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $image_id = $this->request['id'];
            $title = $this->request['title'];
            $img_url = $this->request['img_url'];
            $channel_id = $this->request['channel_id'];
            if(empty($title) || empty($user_id) || empty($channel_id)) {
                $this->ajaxError();
            }

            $conn = new Connection();
            $sets = array(
                "title = '{$title}'",
                "url = '{$img_url}'",
                "channel_id ={$channel_id}"
            );
            $where = "id = {$image_id}";
            $results = $conn->update($this->table, $sets, $where);
            
            $results ? $this->ajaxResponse('edit image success') : $this->ajaxError('edit image error');
        }

        public function deleteImage() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $image_id = $this->request['id'];
            $conn = new Connection();
            $results = $conn->delete($this->table, "id = {$image_id}");
            
            $results ? $this->ajaxResponse('deleted image success!') : $this->ajaxError('deleted image error!');
        }
    }