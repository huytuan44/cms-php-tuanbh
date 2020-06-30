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
        

        $sql = "SELECT {$select} FROM ".DB_NAME.".{$table}";
    
        if (!empty($where)) {
            $sql .= " WHERE {$where}";
        }
        if (!empty($orderBy)) {
            $sql .= "ORDER BY {$orderBy}";
        }
        
        try {
            var_dump($sql);die;
            $result = $this->conn->query($sql);
            $data = [];
            var_dump(mysqli_num_rows($result));die;
            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
            }

            return $data;
        } catch (Exception $ex) {
            echo $ex; exit;
        }
    }

    public function insert($table, $collumns, $values) {
        
        $sql = "INSERT INTO ".DB_NAME.'.'.$table."(".implode(',',$collumns).") VALUES( '".implode("','", $values)."')";
        
        return $this->conn->query($sql);
    }

    public function update($table, $sets, $where) {
        $sql = "UPDATE ".DB_NAME.'.'.$table." SET ".$sets." WHERE ".$where;
        
        return $this->conn->query($sql);
    }

    public function delete($table, $where) {
        $sql = "DELETE FROM ".DB_NAME.'.'.$table.' WHERE '.$where;
        return $this->conn->query($sql);
    }
    
    public function __destruct()
    {
        $this->conn->close();
    }
}