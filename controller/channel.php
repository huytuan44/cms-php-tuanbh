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
            $channel = $conn->select('*', $this->table, $where)->get();
            $postsByChannel = $conn->select('*', 'post', "channel_id={$channel_id}")->get();
            $channel['posts'] = $postsByChannel;
            
            $this->ajaxResponse('get channel success', $channel);
        }

        public function createChannel() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $channel = $this->request['channel'];
            if(empty($channel)) {
                $this->ajaxError();
            }
            $conn = new Connection();
            $collumns = array('channel_name');
            $channels = array(
                $channel
            );
            $results = $conn->insert($this->table, $collumns, $channels);
            
            $results ? $this->ajaxResponse('created channel success') : $this->ajaxError('created channel error');
        }
    }