<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;

class EleveDbModel extends Model
{
    private function makeConnectionDB()
    {
        $port = "2433";
        $servername = "SQLCSSHC\SQLCSSHC";
        $username = "CSHC_APP_INVENTAIRE";
        $password = "2VADMgWje7TnaerTaqfU";
        $dbname = "CSSHC_APPLICATION_INVENTAIRE";

        try {
            $conn = new PDO("sqlsrv:Server=$servername,$port;Database=$dbname;LoginTimeout=30", $username, $password);
            //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
            return $conn;
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }


    public function getEleve()
    {
        $connectionDB = $this->makeConnectionDB();
        $query = "SELECT * FROM ELEVES_ACTIFS";
        $statement = $connectionDB->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;

    }
}