<?php
    abstract class Controller {

        public function ajaxError() {
            $res = array(
                "status" => 'error',
                "code" => 401,
                "data" => []
            );
            echo json_encode($res);
            exit;
        }

        public function ajaxResponse($data) {
            $res = array(
                "status" => 'ok',
                "code" => 200,
                "data" => $data
            );
            echo json_encode($res);
        }
    } 