<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ScolagoDbModel;
use App\Models\EleveDbModel;
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

    public function listClientEleve()
    {
        $eleveDbModel = new EleveDbModel();
        $eleves = $eleveDbModel->getEleve();
        return response()->json($eleves);
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
        $client->setAttribute('nom', $client->prenom . ' ' . $client->nom);

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
                "id" => $client->matricule,
                "nom" => $client->prenom . ' ' . $client->nom,
            ];
        });        return response()->json($clients);
    }

    public function listShow()
    {
        $clients = Client::with(['actifs','emplacement', 'poste', 'type_client'])
        ->where('inactif', false)
        ->get()
        ->map(
            function ($client) {
                return [
                    "id" => $client->id,
                    "matricule" => $client->matricule,
                    "nom" => $client->prenom . ' ' . $client->nom, // Concatenate prenom and nom
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

    //Personne inactif dans le système
    public function getInactifClients()
    {
        $clients = Client::with(['actifs','emplacement', 'poste', 'type_client'])
        ->where('inactif', true)
        ->get()
        ->map(
            function ($client) {
                return [
                    "id" => $client->id,
                    "matricule" => $client->matricule,
                    "nom" => $client->prenom . ' ' . $client->nom, // Concatenate prenom and nom
                    'actifs' =>  $client->actifs->pluck('nom')->implode(', '),
                    'emplacement' => $client->emplacement->nom ?? 'Aucun',
                    'poste' => $client->poste->nom ?? 'Aucun',
                    'type_client' => $client->type_client->nom ?? 'Aucun',
                ];
            }
        );
        return response()->json($clients);
    }


    // Matériel trop vieux attribué à un client
    public function getOlderActifs()
    {
        $fiveYearsAgo = now()->subYears(5);

        return Client::whereHas('actifs', function ($query) use ($fiveYearsAgo) {
            $query->whereDate('actif.created_at', '<=', $fiveYearsAgo);
        })->get();
    }

    // Personne ayant plus de 1 appareil
    public function getMoreThanOneActifs()
    {
        return Client::has('actifs', '>', 1)->get();
    }


    // Personne que le lieu d’attribution ne concorde pas avec l’appareil
    public function getMismatchedActifs()
    {
        return Client::whereHas('actifs', function ($query) {
            $query->whereColumn('actif.id_emplacement', '!=', 'client.id_emplacement');
        })->get();
    }

    // Personne ayant des appareils et ne travaillant plus pour vous
    public function getInnactiveActifs()
    {
        return Client::where('inactif', true)->whereHas('actifs')->get();
    }


    public function getAllAlerts()
    {
        error_log('getAllAlerts');
        $alerts = [];

        // Personne que le lieu d’attribution ne concorde pas avec l’appareil (alerte rouge)
        $mismatchedActifs = $this->getMismatchedActifs();
        if (!$mismatchedActifs->isEmpty()) {
            $alerts[] = ['type' => 'error', 'message' => 'Client que le lieu d\'attribution ne concorde pas avec celui de l\'appareil', 'data' => $mismatchedActifs];
        }

        // Personne ayant des appareils et ne travaillant plus pour vous (alerte rouge)
        $innactiveActifs = $this->getInnactiveActifs();
        if (!$innactiveActifs->isEmpty()) {
            $alerts[] = ['type' => 'error', 'message' => 'Client inactif dans le système ayant un ou des appareils', 'data' => $innactiveActifs];
        }

        // Matériel trop vieux attribué à un client (alerte jaune)
        $olderActifs = $this->getOlderActifs();
        if (!$olderActifs->isEmpty()) {
            $alerts[] = ['type' => 'warning', 'message' => 'Matériel trop vieux attribué à un client', 'data' => $olderActifs];
        }

        // Personne ayant plus de 1 appareil (alerte jaune)
        $moreThanOneActifs = $this->getMoreThanOneActifs();
        if (!$moreThanOneActifs->isEmpty()) {
            $alerts[] = ['type' => 'warning', 'message' => 'Client ayant plus d\'un appareil', 'data' => $moreThanOneActifs];
        }

        // If no alerts, return success message
        if (empty($alerts)) {
            $alerts[] = ['type' => 'success', 'message' => 'Aucun problème détecté!', 'data' => []];
        }

        return response()->json($alerts);
    }


}
