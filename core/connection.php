<?php
define('DB_HOST', 'mysql');
define('DB_PORT', 3306);
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '123456');
define('DB_NAME', 'test');

class Connection {
    public $conn;
    private $sql;
    private $firstTable;
    private $condition = '';
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
            $this->condition .= " WHERE {$where}";
        }
        if (!empty($orderBy)) {
            $this->condition .= " ORDER BY {$orderBy}";
        }
        $this->sql = $sql;
        $this->firstTable = $table;

        return $this;
    }

    public function get() {
        try {
            $sql = $this->sql.$this->condition;
            $result = $this->conn->query(strip_tags($sql));
            $data = [];
            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
            }
            $this->sql = '';
            $this->condition = '';
            return $data;
        } catch (Exception $ex) {
            echo $ex; exit;
        }
    }
    
    public function join($table, $by)
    {
        $this->sql .= " INNER JOIN ".DB_NAME.".{$table} ON ".DB_NAME.".{$table}.id = ".DB_NAME.".{$this->firstTable}.{$by}";

        return $this;
    }

    public function insert($table, $collumns, $values) {
        $now = date('Y-m-d H:i:s');
        $values[] = $now;
        $values[] = $now;    
        $sql = "INSERT INTO ".DB_NAME.".{$table}( ".implode(', ',$collumns).", created_at, updated_at) VALUES('".implode("', '", $values)."')";
            
        return $this->conn->query(strip_tags($sql));
    }

    public function update($table, $sets, $where) {
        $now = date('Y-m-d H:i:s');
        $sets[] = "updated_at = '{$now}'";
        $sql = "UPDATE ".DB_NAME.'.'.$table." SET ".implode(', ',$sets)." WHERE ".$where;
        
        return $this->conn->query(strip_tags($sql));
    }

    public function delete($table, $where) {
        $sql = "DELETE FROM ".DB_NAME.'.'.$table.' WHERE '.$where;
        
        return $this->conn->query(strip_tags($sql));
    }
    
    public function __destruct()
    {
        $this->conn->close();
    }
}