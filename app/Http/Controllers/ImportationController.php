<?php

namespace App\Http\Controllers;



use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use SplFileObject;



class ImportationController extends Controller
{
    protected $modeleController;
    protected $actifController;

    public function __construct(ModeleController $modeleController, ActifController $actifController)
    {
        $this->modeleController = $modeleController;
        $this->actifController = $actifController;
    }
    public function importFromCSV(Request $request){
        /*
        ATTENTION

        Si vous utiliser excel anglais pour faire vos csv, sa la ligne $file->fgetcsv( ","); prend une virgule, sinon elle devrait etre
        $file->fgetcsv( ";"); avec un point virgule
        */ 
        //Get CSV File from storage
        $csvFile = storage_path('../app/CsvFiles/TestCSV2.csv');
        $file = new SplFileObject($csvFile, 'r');

        // Check for BOM
        $bom = $file->fread(3);
        if ($bom != "\xEF\xBB\xBF") {
            $file->rewind();
        }

        $header = $file->fgetcsv(";");
        $data = [];
    
        while (!$file->eof()) {
            $row = $file->fgetcsv( ";");
        
            if ($row !== false && count($row) === count($header)) {
                // Removed the call to utf8_encode
                $data[] = array_combine($header, $row);
            }
        }



        /* Exemple d'un élément du tableau data   {
        "Asset Name": "0230-159-01",
        "Model": "OptiPlex",
        "Model No.": "3060",
        "Category": "Bureau",
        "Manufacturer": "DELL INC.",
        "Serial": "GWJSHQ2",
        "Purchased": "2018-09-16 00:00",
        "Location": "023 - Crifa",
        "Checked Out": "023 - Crifa",
        "Type": "location",
        "Status": "DistribuÃ© (deployed)",
        "Checkout Date": "2019-02-20 14:16",
        "Created At": "2019-02-18 15:04",
        "Updated at": "2020-08-04 11:03",
        "Notes": "modifie PC par TS",
        "MAC Adress": "54BF64777858",
        "Propriété SI": "",
        "Propriété": ""
        "Username": "xroy",
    },*/
    Log::error('NEW TEST :))))))))))))))))))))))))))))))))))))');




    foreach ($data as $row) {
        Log::error("Checked out = " . $row['Checked Out']);
        //On appelle une fonction du modeleController qui va créer un modele à partir des données du CSV, on retourne l'id du modèle pour l'utiliser dans la creation d'un actif.
        $id_modele = $this->modeleController->createModelFromImport($row['Manufacturer'], $row['Model'], $row['Model No.'], $row['Category']);

        //On appelle une fonction du actifController qui va créer un actif à partir des données du CSV.
        $this->actifController->createActifFromImport($row['Asset Name'], $row['Serial'], $row['Purchased'], $row['Location'], $row['Checked Out'], $row['Status'], $row['Notes'], $id_modele, $row['Propriété SI'], $row['MAC Adress'], $row['Propriété'], $row['Checked Out'], $row['Username']);
    }
    

    return response()->json($data);

        $firstRow = $data[0];
        $file = null;

    }
}
?>