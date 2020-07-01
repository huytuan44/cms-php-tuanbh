<?php
    include('./core/controller.php');
    include('./core/connection.php');

    class Authentication extends Controller {
        private $request = '';
        private $table = 'user';
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
            $users = $conn->select('*', $this->table, "username = '{$username}'")->get();
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
            $age = $this->request['age'];
            $gender = $this->request['gender'];
            if(empty($username) || empty($password) || empty($email)) {
                $this->ajaxError();
            }

            $conn = new Connection();

            //get old username and check new user was existed
            $oldUser = $conn->select('username',$this->table)->get();
            $listUsername = [];
            foreach($oldUser as $user) {
                $listUsername[] = $user['username'];
            }
            if(in_array($username, $listUsername)) {
                $this->ajaxError('username was existed!');
            }
            $collumns = array('username', 'password', 'email', 'age', 'gender');
            $user = array(
                $username,
                $password,
                $email,
                $age,
                $gender
            );
            $results = $conn->insert($this->table, $collumns, $user);
            
            $results ? $this->ajaxResponse('signup success') : $this->ajaxError('signup error');
        }

        public function editUser() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $user_id = $this->request['id'];
            $username = $this->request['username'];
            $password = $this->request['password'];
            $email = $this->request['email'];
            $age = $this->request['age'];
            $gender = $this->request['gender'];
            if(empty($username) || empty($password) || empty($email)) {
                $this->ajaxError();
            }

            $conn = new Connection();
            $sets = array(
                "username = '{$username}'",
                "password = '{$password}'",
                "email = '{$email}'",
                "age ={$age}",
                "gender = {$gender}"
            );
            $where = "id = {$user_id}";
            $results = $conn->update($this->table, $sets, $where);
            
            $results ? $this->ajaxResponse('signup success') : $this->ajaxError('signup error');
        }

        public function deleteUser() {
            if($_SERVER['REQUEST_METHOD'] != 'POST') {
                $this->ajaxError();
            }
            $user_id = $this->request['id'];
            $conn = new Connection();
            $results = $conn->delete($this->table, "id = {$user_id}");
            
            $results ? $this->ajaxResponse('delete success!') : $this->ajaxError('delete error!');
        }
    }