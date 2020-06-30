<?php
    include('./core/controller.php');
    include('./core/connection.php');

    class Authorization extends Controller {
        public function checkAdmin($user) {
            if(in_array($user['username'], array('quynhht', 'tuanbh'))) // check username admin 
            {
                return true;
            }
            return false;
        }
    }