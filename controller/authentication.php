<?php
    include('./core/controller.php');
    include('./core/connection.php');

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

            $conn = new Connection();
            $users = $conn->select('*', 'user', "username = '{$username}'");
            if (count($users) < 1) {
                $this->ajaxError();
            }
            if ($users[0]['password'] !== $password ) {
                $this->ajaxError();
            }
            unset($users[0]['password']);
            $this->ajaxResponse('login success', $users[0]);
        }

        public function register() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $username = $this->request['username'];
            $password = $this->request['password'];
            $email = $this->request['email'];
            if(empty($username) || empty($password) || empty($email)) {
                $this->ajaxError();
            }

            $conn = new Connection();
            $collumns = array('username', 'password', 'email', 'created_date', 'updated_date');
            $now = date('Y-m-d H:i:s');
            $user = array(
                $username,
                $password,
                $email,
                $now,
                $now
            );
            $results = $conn->insert('user', $collumns, $user);
            
            $results ? $this->ajaxResponse('signup success') : $this->ajaxError('signup error');
        }

        public function editUser() {

        }

        public function deleteUser() {
            
        }
    }