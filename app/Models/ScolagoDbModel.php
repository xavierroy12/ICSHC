<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;

class ScolagoDbModel extends Model
{


    private function makeConnectionDB()
    {
        $port = "2433";
        $servername = "10.0.1.38";
        $username = "CSHC_APP_INVENTAIRE";
        $password = "2VADMgWje7TnaerTaqfU";
        $dbname = "PAIE_SCOLAGO";
    
        try {
            $conn = new PDO("sqlsrv:Server=$servername,$port;Database=$dbname;LoginTimeout=30", $username, $password);
            //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected successfully";
            return $conn;
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    
    }



    public function getEmployees()
    {
        $connectionDB = $this->makeConnectionDB();
        $query = "SELECT PAI_DOS.MATR, ISNULL(PAI_DOS_2.ADR_ELECTRNQ_PORTAIL,'') AS UserPrincipalName, PAI_DOS.NOM, PAI_DOS.PRNOM, IIF(PAI_DOS_EMPL.DATE_EFF > DATEADD(DAY, -90, GETDATE()) OR PAI_DOS_EMPL.ETAT LIKE '[APS]%', PAI_DOS_EMPL.LIEU_TRAV, '---') AS LIEU FROM PAI_DOS JOIN PAI_DOS_2 ON (PAI_DOS_2.MATR = PAI_DOS.MATR) JOIN PAI_DOS_EMPL ON (PAI_DOS_EMPL.MATR = PAI_DOS.MATR AND IND_EMPL_PRINC = '1') WHERE PAI_DOS_EMPL.LIEU_TRAV != '---'";
        $statement = $connectionDB->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}

?>
