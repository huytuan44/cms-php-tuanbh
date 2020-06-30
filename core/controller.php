<?php
    abstract class Controller {

        public function ajaxError($error = '') {
            $res = array(
                "status" => 'error: '.$error,
                "code" => 401,
                "data" => []
            );
            echo json_encode($res);
            exit;
        }

        public function ajaxResponse($status, $data = array()) {
            $res = array(
                "status" => $status,
                "code" => 200,
                "data" => $data
            );
            echo json_encode($res);
        }
    } 