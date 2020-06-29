<?php
define('DB_HOST', 'mysql');
define('DB_PORT', 3306);
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '123456');
define('DB_NAME', 'test');

class Connection {
    public $conn;

    public function __construct() {
        $this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT);
        if($this->conn->connect_errno) {
            echo 'error: '.$this->conn->connect_error;
            exit;
        }
    }

    public function select($select, $table, $where = null, $orderBy = null) {
        
        $query = "";
        $query = "SELECT {$select} FROM ".DB_NAME.".{$table}";
    
        if (!empty($where)) {
            $query .= " WHERE {$where}";
        }
        if (!empty($orderBy)) {
            $query .= "ORDER BY {$orderBy}";
        }
        try {
            $result = $this->conn->query($query);
            $data = [];
            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
            }
            mysqli_close($this->conn);

            return $data;
        } catch (\Throwable $th) {
            //throw $th;
        }

    }


}