<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ScolagoDbModel;
use App\Http\Controllers\EmplacementController;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    public function getClientFromEmail($email)
    {
        $client = Client::where('courriel', $email)->first();

    if ($client) {
        return $client;
    } else {
        return FALSE;
    }
    }

    public function listClientScolago()
    {
        
        $scolagoDbModel = new ScolagoDbModel();
        $clients = $scolagoDbModel->getEmployees();
        return response()->json($clients);

    }

    public function storeListClientScolage(){
        $scolagoDbModel = new ScolagoDbModel();
        $emplacementController = new EmplacementController();
        $clients = $scolagoDbModel->getEmployees();


        
        foreach ($clients as $client) {
            $matriculeLieu = $client['LIEU'];
           $emplacement = $emplacementController->getEmplacement($matriculeLieu);
  
            $clientData = [
                'matricule' => $client["MATR"],
                'nom' => $client["NOM"],
                'prenom' => $client["PRNOM"],
                'id_type_client' => 1,
            ];

            $existingClient = Client::where('matricule', $client["MATR"])->first();

            //If client has email, set email.
            if($client["UserPrincipalName"] != null){
                $courriel = $client["UserPrincipalName"];
                $clientData['courriel'] = $courriel;
            }
            //If client has emplacement, set emplacement.
            error_log($existingClient);
            if (isset($existingClient) && $existingClient->emplacement_manuel){
                //skip the check
            } else {
                if ($emplacement !== null) {
                    $id_emplacement = $emplacement->id;
                    $clientData['id_emplacement'] = $id_emplacement;
                }
            }
            
            

            if ($existingClient) {
                $existingClient->update($clientData);
            } else {
                Client::create($clientData);
            }
            
        }
        
        return response()->json($clients);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
    public function showAll()
    {
        $clients = Client::all();
        return response()->json($clients);
    }
    public function lightShow()
    {
        $clients = Client::All()->map(function ($client) {
            return [
                "id" => $client->id,
                "nom" => $client->nom,
            ];
        });
        return response()->json($clients);
    }
}
