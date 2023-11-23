<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ScolagoDbModel;
use App\Models\EleveDbModel;
use App\Http\Controllers\EmplacementController;
use Illuminate\Http\Request;
use App\Http\Controllers\ActifController;
use App\Models\TypeClient;


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
        $totalClients = count($clients);
        $counter = 0;
        $typeClient = TypeClient::where('nom', 'Personnel')->first();

        foreach ($clients as $client) {
            $matriculeLieu = $client['LIEU'];
            $emplacement = $emplacementController->getEmplacement($matriculeLieu);
            $clientData = [
                'matricule' => $client["MATR"],
                'nom' => $client["NOM"],
                'prenom' => $client["PRNOM"],
                'id_type_client' => $typeClient->id,
            ];

            $existingClient = Client::where('matricule', $client["MATR"])->first();

            //If client has email, set email.
            if ($client["UserPrincipalName"] != null) {
                $courriel = $client["UserPrincipalName"];
                $clientData['courriel'] = $courriel;
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

            } else {
                Client::create($clientData);
            }
            $counter++;
            error_log("Processed client {$counter} out of {$totalClients}");

        }
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

        // Save the parent model instance
        $client->actifs()->saveMany($actifs);

        return response()->json($client);
    }

    //Personne inactif dans le système
    public function getInactifClients()
    {
        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('inactif', true)
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

        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('inactif', false)
            ->whereHas('actifs', function ($query) use ($fiveYearsAgo) {
                $query->whereDate('created_at', '<=', $fiveYearsAgo);
            })
            ->get()
            ->map($this->clientMapFunction());

        return response()->json($clients);
    }

    // Personne ayant plus de 1 appareil
    public function getMoreThanOneActifs()
    {
        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->has('actifs', '>', 1)
            ->get()
            ->map($this->clientMapFunction());

        return response()->json($clients);
    }

    // Personne que le lieu d’attribution ne concorde pas avec l’appareil
    public function getMismatchedActifs()
    {
        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->whereHas('actifs', function ($query) {
                $query->whereColumn('actif.id_emplacement', '!=', 'client.id_emplacement');
            })
            ->get()
            ->map($this->clientMapFunction());

        return response()->json($clients);
    }

    // Personne ayant des appareils et ne travaillant plus pour vous
    public function getInnactiveActifs()
    {
        $clients = Client::with(['actifs', 'emplacement', 'poste', 'type_client'])
            ->where('inactif', true)
            ->whereHas('actifs')
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


}
