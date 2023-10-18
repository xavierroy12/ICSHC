<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ScolagoDbModel;
use App\Http\Controllers\EmplacementController;
use Illuminate\Http\Request;
use App\Http\Controllers\ActifController;
use App\Models\Actif;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
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
            //$arr = get_object_vars($client['LIEU']);

            print_r('Matricule lieu '. $matriculeLieu);
           $id_emplacement = $emplacementController->getEmplacement($matriculeLieu);
            print_r('id_emplacement = ' . $id_emplacement);
            $clientData = [
                'matricule' => $client["MATR"],
                'nom' => $client["NOM"],
                'prenom' => $client["PRNOM"],

                'id_type_client' => 1,
            ];
            if($client["UserPrincipalName"] != null){
                $clientData['courriel'] = $client["UserPrincipalName"];
            }
            if($id_emplacement != NULL)
            {
                $clientData['id_emplacement'] = $id_emplacement;
            }
            if($client["UserPrincipalName"] != null){
                $clientData['courriel'] = $client["UserPrincipalName"];
            }
            $client = Client::create($clientData);
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
    public function show($id)
    {
        $client = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])->find($id);

        return response()->json($client);
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
        });        return response()->json($clients);
    }

    public function listShow()
    {
        $clients = Client::with(['actifs','emplacement', 'poste', 'type_client'])->get()
        ->map(
            function ($client) {
                return [
                    "id" => $client->id,
                    "nom" => $client->nom,
                    'actifs' =>  $client->actifs->pluck('nom')->implode(', '),
                    'emplacement' => $client->emplacement->nom ?? 'Aucun',
                    'poste' => $client->poste->nom ?? 'Aucun',
                    'type_client' => $client->type_client->nom ?? 'Aucun',
                ];
            }
        );
        return response()->json($clients);
    }

    public function updateActifs(Request $request, $id)
    {
        // Retrieve the parent model instance
        $client = Client::with(['actifs'])->findOrFail($id);

        // Retrieve the related models
        $old_actifs = $client->actifs;

        // Update the related models
        foreach ($old_actifs as $old_actif) {
            $old_actif->id_client = null;
            $old_actif->save();
        }

        $data = $request->all();
        $id_actifs = $data['actifs'];
        $actif_controller = new ActifController;
        $actifs = [];
        foreach ($id_actifs as $id_actif) {
            $actif = $actif_controller->show($id_actif);
            $actifs[] = $actif;
            $actif->id_client = $client->id; // Set the id_client field to the current client's id
            $actif->save();
        }

        // Save the parent model instance
        $client->actifs()->saveMany($actifs);

        return response()->json($client);
    }
}
