<?php
    include('./core/controller.php');
    include('./core/connection.php');
    class Channel extends Controller {
        private $request = [];
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
            $channel = $conn->select('*', $this->table, $where)->get();
            $postsByChannel = $conn->select('*', 'post', "channel_id={$channel_id}")->get();
            $channel['posts'] = $postsByChannel;
            
            $this->ajaxResponse('get channel success', $channel);
        }

        public function getChannelsWithPost() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $channels = $conn->select('*', $this->table)->get();
            foreach($channels as $key => $channel) {
                $channels[$key]['posts'] = $conn->select('*', 'post', "channel_id={$channel['id']}")->get();
            }
            $this->ajaxResponse('get channels success', $channels);
        }

        public function getChannelsWithImage() {
            if($_SERVER['REQUEST_METHOD'] != 'GET') {
                $this->ajaxError();
            }
            $conn = new Connection();
            $channels = $conn->select('*', $this->table)->get();
            foreach($channels as $key => $channel) {
                $channels[$key]['images'] = $conn->select('*', 'image', "channel_id={$channel['id']}")->get();
            }
            $this->ajaxResponse('get channels success', $channels);
        }

        public function createChannel() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $channel = $this->request['channel'];
            $title = $this->request['title'];
            if(empty($channel)) {
                $this->ajaxError();
            }
            $conn = new Connection();
            $collumns = array('channel_name', 'title');
            $channels = array(
                $channel,
                $title
            );
            $results = $conn->insert($this->table, $collumns, $channels);
            
            $results ? $this->ajaxResponse('created channel success') : $this->ajaxError('created channel error');
        }

        public function updateChannel() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $sets = array();
            $id = $this->request['channel_id'];
            $channel = $this->request['channel'];
            $title = $this->request['title'];
            if(!empty($channel)) {
                $sets[] = "channel_name = '{$channel}'";
            }
            if(!empty($title)) {
                $sets[] = "title = '{$title}'";
            }
            $conn = new Connection();
            $where = "id = {$id}";
            $results = $conn->update($this->table, $sets, $where);
            
            $results ? $this->ajaxResponse('updated channel success') : $this->ajaxError('updated channel error');
        }
    }