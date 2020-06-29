<?php
    include('controller.php');
    include('connection.php');

    class Authentication extends Controller {
        private $request = '';
        public function __construct() {
            $this->request  = $_REQUEST;
        }

        public function login() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $username = $this->request['username'];
            $password = $this->request['password'];
            if(empty($username) || empty($password)) {
                $this->ajaxError();
            }
            // var_dump($username, $password);die;
            $conn = new Connection();
            $users = $conn->select('*', 'user', "username = '{$username}'");
            if (count($users) < 1) {
                $this->ajaxError();
            }
            if ($users[0]['password'] !== $password ) {
                $this->ajaxError();
            }
            unset($users[0]['password']);
            $this->ajaxResponse($users[0]);
        }

        public function register() {

        }

        public function logout() {

        }
    }