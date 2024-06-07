<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ScolagoDbModel;
use App\Models\EleveDbModel;
use App\Http\Controllers\EmplacementController;
use Illuminate\Http\Request;
use App\Http\Controllers\ActifController;
use App\Models\TypeClient;
use Illuminate\Support\Facades\Log;


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

    public function storeListClientScolage()
    {
        $scolagoDbModel = new ScolagoDbModel();
        $emplacementController = new EmplacementController();
        $clients = $scolagoDbModel->getEmployees();
        Log::info($clients);
        $totalClients = count($clients);
        $counter = 0;
        $typeClient = TypeClient::where('nom', 'Employé')->first();
        $uniqueLieux = [];
        Log::info('new Test');
        foreach ($clients as $client) {
            $inactive = False;            
            if ($client['LIEU'] == '---') {

                $inactive = True;
            }
            $matriculeLieu = $client['LIEU'];

            $emplacement = $emplacementController->getEmplacement($matriculeLieu);

            if(isset($emplacement) && $emplacement != null){

            }
            else{
                if (!in_array($client['LIEU'], $uniqueLieux)) {
                    // Add 'LIEU' to the array
                    $uniqueLieux[] = $client['LIEU'];
                }
            }

            $clientData = [
                'matricule' => $client["MATR"],
                'nom' => $client["NOM"],
                'prenom' => $client["PRNOM"],
                'id_type_client' => $typeClient->id,
                'inactif' => $inactive,
                'username' => '',
            ];

            $existingClient = Client::where('matricule', $client["MATR"])->first();

            //If client has email, set email.
            if ($client["UserPrincipalName"] != null) {
                $courriel = $client["UserPrincipalName"];
                $clientData['courriel'] = $courriel;
                    // Extract the string before the @ in the email
                $username = strtok($courriel, '@');
                $clientData['username'] = $username;
            }
            
            //If client has emplacement, set emplacement.

            if (isset($existingClient) && $existingClient->emplacement_manuel) {
                //skip the check
            } else {
                if ($emplacement !== null) {
                    $id_emplacement = $emplacement->id;
                    $clientData['id_emplacement'] = $id_emplacement;
                }
            }

            if ($existingClient) {
                $existingClient->update($clientData);

            }
            else {
                Log::info("This is the client data before creating the client: " . print_r($clientData, true));
                $newClient = Client::create($clientData);
                Log::info("New client created: " . print_r($newClient->toArray(), true));

            }
            $counter++;
            Log::info("Processed client {$counter} out of {$totalClients}");

        }
        /*foreach ($uniqueLieux as $lieu) {
            Log::info("Unique Lieu: " . $lieu);
        }*/
    }

    public function listClientEleve()
    {
        $eleveDbModel = new EleveDbModel();
        $eleves = $eleveDbModel->getEleve();
        return response()->json($eleves);
    }

    public function storeClientEleve()
    {
        //Variable necessaire pour ajouter les eleves
        $emplacementController = new EmplacementController();
        $eleveDbModel = new EleveDbModel();
        $eleves = $eleveDbModel->getEleve();
        $totalClients = count($eleves);
        $counter = 0;

        $typeEleve = TypeClient::where('nom', 'Élève')->first();
        foreach ($eleves as $eleve) {
            $matriculeLieu = $eleve['ECO'];
            $emplacement = $emplacementController->getEmplacement($matriculeLieu);


            $clientData = [
                'matricule' => $eleve["FICHE"],
                'nom' => $eleve["NOM"],
                'prenom' => $eleve["PNOM"],
                'id_type_client' => $typeEleve->id,
            ];

            $existingClient = Client::where('matricule', $eleve["FICHE"])->first();
            //If the eleve has a emplacement, set emplacement.
            if ($emplacement !== null) {
                $id_emplacement = $emplacement->id;
                $clientData['id_emplacement'] = $id_emplacement;
            } //If the eleve has no emplacement, set emplacement to 1, wich is no emplacement.
            else {
                $clientData['id_emplacement'] = 1;
            }


            if ($existingClient) {
                $existingClient->update($clientData);
            } else {
                Client::create($clientData);
            }
            $counter++;
            error_log("Processed eleves {$counter} out of {$totalClients}");
        }

    }

    public function syncAllClients()
    {
        $this->storeListClientScolage();
        $this->storeClientEleve();
        return response()->json(['message' => 'Sync completed successfully'], 200);
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
        $client = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('id', $id)
            ->first();
        if ($client) {
            $client = [
                "id" => $client->id,
                "matricule" => $client->matricule,
                "nom" => $client->prenom . ' ' . $client->nom, // Concatenate prenom and nom
                'actifs' => $client->actifs,
                'emplacement' => $client->emplacement->nom ?? 'Aucun',
                'poste' => $client->poste->nom ?? 'Aucun',
                'triggerAlerts' => $client->triggerAlerts,
                'type_client' => $client->type_client->nom ?? 'Aucun',
            ];
        }
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
                "nom" => $client->matricule . ' - ' . $client->prenom . ' ' . $client->nom,
            ];
        });
        return response()->json($clients);
    }

    public function listShow()
    {
        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('inactif', false)
            ->where('is_Emplacement', false)
            ->get()
            ->map(
                function ($client) {
                    return [
                        "id" => $client->id,
                        "matricule" => $client->matricule,
                        "nom" => $client->prenom . ' ' . $client->nom, // Concatenate prenom and nom
                        'actifs' => $client->actifs->pluck('nom')->implode(', '),
                        'emplacement' => isset($client->emplacement) && isset($client->emplacement->matricule) && isset($client->emplacement->nom) ? ($client->emplacement->matricule . " - " . $client->emplacement->nom) : 'Aucun',
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
        $client->triggerAlerts = $data['triggerAlerts'];

        $client->save();
        // Save the parent model instance
        $client->actifs()->saveMany($actifs);

        return response()->json($client);
    }

    //Personne inactif dans le système
    public function getInactifClients()
    {
        $clientsNoAlert = Client::where('triggerAlerts', false)->pluck('id');

        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('inactif', true)
            ->whereNotIn('id', $clientsNoAlert)
            ->get()
            ->map(
                function ($client) {
                    return [
                        "id" => $client->id,
                        "matricule" => $client->matricule,
                        "nom" => $client->prenom . ' ' . $client->nom, // Concatenate prenom and nom
                        'actifs' => $client->actifs->pluck('nom')->implode(', '),
                        'emplacement' => $client->emplacement->nom ?? 'Aucun',
                        'poste' => $client->poste->nom ?? 'Aucun',
                        'type_client' => $client->type_client->nom ?? 'Aucun',
                    ];
                }
            );



        return response()->json($clients);
    }


    public function getOlderActifs()
    {
        $fiveYearsAgo = now()->subYears(5);

        $clientsNoAlert = Client::where('triggerAlerts', false)->pluck('id');


        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->whereHas('actifs', function ($query) use ($fiveYearsAgo) {
                $query->whereDate('created_at', '<=', $fiveYearsAgo);
            })
            ->whereNotIn('id', $clientsNoAlert)
            ->get()
            ->map($this->clientMapFunction());

        return response()->json($clients);
    }

    // Personne ayant plus de 1 appareil
    public function getMoreThanOneActifs()
    {
        $clientsNoAlert = Client::where('triggerAlerts', false)->pluck('id');


        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->has('actifs', '>', 1)
            ->whereNotIn('id', $clientsNoAlert)
            ->get()
            ->map($this->clientMapFunction());
        return response()->json($clients);
    }

    // Personne que le lieu d’attribution ne concorde pas avec l’appareil
    public function getMismatchedActifs()
    {
        $clientsNoAlert = Client::where('triggerAlerts', false)->pluck('id');

        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
        ->whereHas('actifs', function ($query) {
            $query->whereColumn('actif.id_emplacement', '!=', 'client.id_emplacement');
        })
        ->whereNotIn('id', $clientsNoAlert)
        ->get()
        ->map($this->clientMapFunction());


        return response()->json($clients);
    }

    // Personne ayant des appareils et ne travaillant plus pour vous
    public function getInnactiveActifs()
    {
        $clientsNoAlert = Client::where('triggerAlerts', false)->pluck('id');


        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('inactif', true)
            ->whereHas('actifs')
            ->whereNotIn('id', $clientsNoAlert)
            ->get()
            ->map($this->clientMapFunction());


        return response()->json($clients);
    }

    private function clientMapFunction()
    {
        return function ($client) {
            return [
                "id" => $client->id,
                "matricule" => $client->matricule,
                "nom" => $client->prenom . ' ' . $client->nom, // Concatenate prenom and nom
                'actifs' => $client->actifs->pluck('nom')->implode(', '),
                'emplacement' => $client->emplacement->nom ?? 'Aucun',
                'poste' => $client->poste->nom ?? 'Aucun',
                'type_client' => $client->type_client->nom ?? 'Aucun',
            ];
        };
    }

    public function getAllAlerts()
    {
        $alerts = [];


        // Personne que le lieu d’attribution ne concorde pas avec l’appareil (alerte rouge)
        $mismatchedActifs = $this->getMismatchedActifs()->original;
        if (!empty($mismatchedActifs)) {
            $alerts[] = ['type' => 'error', 'message' => 'Client que le lieu d\'attribution ne concorde pas avec celui de l\'appareil', 'data' => $mismatchedActifs];
        }

        // Personne ayant des appareils et ne travaillant plus pour vous (alerte rouge)
        $innactiveActifs = $this->getInnactiveActifs()->original;
        if (!empty($innactiveActifs)) {
            $alerts[] = ['type' => 'error', 'message' => 'Client inactif dans le système ayant un ou des appareils', 'data' => $innactiveActifs];
        }

        // Matériel trop vieux attribué à un client (alerte jaune)
        $olderActifs = $this->getOlderActifs()->original;
        if (!empty($olderActifs)) {
            $alerts[] = ['type' => 'warning', 'message' => 'Matériel trop vieux attribué à un client', 'data' => $olderActifs];
        }

        // Personne ayant plus de 1 appareil (alerte jaune)
        $moreThanOneActifs = $this->getMoreThanOneActifs()->original;
        if (!empty($moreThanOneActifs)) {
            $alerts[] = ['type' => 'warning', 'message' => 'Client ayant plus d\'un appareil', 'data' => $moreThanOneActifs];
        }

        // If no alerts, return success message
        if (empty($alerts)) {
            $alerts[] = ['type' => 'success', 'message' => 'Aucun problème détecté!', 'data' => []];
        }


        return response()->json($alerts);
    }

    public function updateAlerts(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $data = $request->all();
        $client->triggerAlerts = $data['triggerAlerts'];
        $client->save();
        return response()->json($client);
    }


}
