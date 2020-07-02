<?php
    include('./core/controller.php');
    include('./core/connection.php');
    class Channel extends Controller {
        private $request = '';
        private $table = 'channel';
        public function __construct() {
            $this->request  = $_REQUEST;
        }

        public function getChannels() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $channels = $conn->select('*', $this->table)->get();
            $this->ajaxResponse('get channels success', $channels);
        }

        public function getChannel() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $channel_id = $this->request['channel_id'];
            $where = $this->table.".id = {$channel_id}";
            $posts = $conn->select('*', $this->table, $where)->get();
            
            $this->ajaxResponse('get channel success', $posts);
        }
    }