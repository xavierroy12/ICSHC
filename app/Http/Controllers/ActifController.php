<?php

namespace App\Http\Controllers;



use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ActifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function showall()
    {
        $actifs = Actif::all();
        return response()->json($actifs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function updateMultiple(Request $request)
    {
        $data = $request->all();
        $arrayIdActifs = $data['ids'];
        $values = $data['values'];

        //request object with all possible fields, if not set, set to null
        $requestData = [
            'en_entrepot' => isset($values['en_entrepot']) ? $values['en_entrepot'] : null,
            'date_retour' => isset($values['date_retour']) ? $values['date_retour'] : null,
            'note' => isset($values['note']) ? $values['note'] : null,
            'id_modele' => isset($values['modele']) ? $values['modele'] : null,
            'id_categorie' => isset($values['categorie']) ? $values['categorie'] : null,
            'id_statut' => isset($values['statut']) ? $values['statut'] : null,
            'id_emplacement' => isset($values['emplacement']) ? $values['emplacement'] : null,
            'id_proprietaire' => isset($values['proprietaire']) ? $values['proprietaire'] : null,
            'id_utilisation' => isset($values['utilisation']) ? $values['utilisation'] : null,
        ];
        $filteredData = array_filter($requestData, function ($value) {
            return $value !== null;
        });

        //update each actif with the request data
        foreach ($arrayIdActifs as $id) {
            // Get the Actif object to update
            $actif = Actif::findOrFail($id);

            $client = Client::where('id_actif', $id);

            //Remove assignation from previous client
            if (isset($values['desassignation']) && $values['desassignation']) {
                $client->update(['id_actif' => null]);
                $actif->update(['id_client' => null]);
            }
            if (!$actif->update($filteredData)) {
                return response()->json(['message' => 'Erreur lors de la mise à jour de l\'actif'], 500);
            }
            $actif->save();
        }

        return response()->json(['message' => 'Actifs mis à jour avec succès'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validez les données du formulaire
            $validatedData = $request->validate([
                'numero_serie' => 'required|max:255',
                'nom' => 'required|max:255',
                'en_entrepot' => 'required|in:1,0',
                'adresse_mac' => 'nullable|max:255',
                'date_retour' => 'nullable|date',
                'note' => 'nullable',
                'id_statut' => 'required',
                'id_emplacement' => 'required',
                'id_proprietaire' => 'required',
                'id_utilisation' => 'required',
                'numero_commande' => 'required',
                //'id_modele' => 'required', Might not be since it isnt required when you get commande ?

            ]);

            // Créez un nouvel actif en utilisant les données validées
            $actif = new Actif($validatedData);

            // Sauvegarde l'actif dans la base de données
            if ($actif->save()) {
                // Retournez une réponse JSON pour indiquer le succès
                return response()->json(['message' => 'Actif ajouté avec succès'], 201);
            } else {
                // En cas d'échec de sauvegarde, retournez une réponse d'erreur
                return response()->json(['message' => 'Erreur lors de l\'ajout de l\'actif'], 500);
            }
        } catch (\Exception $e) {
            // En cas d'exception, retournez une réponse d'erreur avec le message d'erreur
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(int $idActif)
    {
        // Find the actif by ID
        $actif = Actif::find($idActif);
        return $actif;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Actif $Actif)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            // Get the Actif object to update
            $actif = Actif::findOrFail($id);


            // Get the data from the form
            $data = $request->all();
            if ($data['id_assigne_a'] == 'Aucun' || $data['id_assigne_a'] == '') {
                $data['id_assigne_a'] = null;
            }
            if ($data['id_proprietaire'] == 'Aucun' || $data['id_proprietaire'] == '') {
                $data['id_proprietaire'] = null;
            }
            if ($data['id_utilisation'] == 'Aucun' || $data['id_utilisation'] == '') {
                $data['id_utilisation'] = null;
            }
            if ($data['id_emplacement'] == 'Aucun' || $data['id_emplacement'] == '') {
                $data['id_emplacement'] = null;
            }
            if ($data['id_statut'] == 'archivé') {
                $statut_archived = DB::table('statut')->where('nom', 'Archivé')->first();
                $data['id_statut'] = $statut_archived->id;
            }
            // Map the form data to match the expected field names in your Laravel API
            $updatedDataActif = [
                'nom' => $data['nom'],
                'numero_serie' => $data['numero_serie'],
                'en_entrepot' => $data['en_entrepot'],
                'date_retour' => $data['date_retour'],
                'note' => $data['note'],
                'id_modele' => $data['id_modele'],
                'id_statut' => $data['id_statut'],
                'id_emplacement' => $data['id_emplacement'],
                'id_proprietaire' => $data['id_proprietaire'],
                'id_utilisation' => $data['id_utilisation'],
                'id_client' => $data['id_assigne_a']
                //'numero_commande' => $data['numero_commande'], //Todo add this to the form
            ];


            // Update the Actif object with the updated data
            $actif->fill($updatedDataActif);

            // Save the updated Actif object to the database
            if ($actif->save()) {
                // Return a success response
                return response()->json(['message' => 'Actif mis à jour avec succès'], 200);
            } else {
                // Return an error response
                return response()->json(['message' => "Erreur lors de la mise à jour de l'actif"], 500);
            }
        } catch (\Exception $e) {
            // Return an error response with the error message
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Actif $Actif)
    {
        //
    }

    public function listShow()
    {
        $actifs = Actif::with(['modele.categorie', 'statut', 'client', 'emplacement'])
            ->whereHas('statut', function ($query) {
                $query->where('nom', '!=', 'Archivé');
            })
            ->get()
            ->map(function ($actif) {
                return [
                    'id' => $actif->id,
                    'numero_commande' => $actif->numero_commande,
                    'numero_serie' => $actif->numero_serie,
                    'nom' => $actif->nom,
                    'modele' => $actif->modele->nom,
                    'categorie' => $actif->modele->categorie->nom,
                    'statut' => $actif->statut->nom,
                    'client' => $actif->client ? ($actif->client->prenom . ' ' . $actif->client->nom) : 'Aucun',
                    'emplacement' => $actif->emplacement->matricule . " - " . $actif->emplacement->nom,
                ];
            });
        return response()->json($actifs);
    }

    public function showActif($id)
    {
        $actif = Actif::with([
            'emplacement',
            'statut',
            'utilisation',
            'proprietaire',
            'modele',
            'modele.categorie',
            'client',
        ])->find($id);

        if (!$actif) {
            return response()->json(['message' => 'Actif non trouvé'], 404);
        }

        $data = [
            'numero_serie' => $actif->numero_serie,
            'nom' => $actif->nom,
            'adresse_mac' => $actif->adresse_mac,
            'id_modele' => $actif->modele->id,
            'categorie' => $actif->modele->categorie->nom,
            'id_statut' => $actif->statut->id,
            'id_utilisation' => $actif->utilisation->id ?? "Aucun",
            'id_proprietaire' => $actif->proprietaire->id ?? "Aucun",
            'id_emplacement' => $actif->emplacement->id,
            'id_client' => $actif->client->id ?? "Aucun",
            'en_entrepot' => $actif->en_entrepot,
            'date_retour' => $actif->date_retour,
            'note' => $actif->note,
            'numero_commande' => $actif->numero_commande ?? "Aucun",
        ];
        return response()->json($data);
    }


    public function lightShow()
    {
        $actifs = Actif::whereHas('statut', function ($query) {
            $query->where('nom', '!=', 'Archivé');
        })
            ->get()
            ->map(function ($actif) {
                return [
                    "id" => $actif->id,
                    "nom" => $actif->nom,
                    "numero_serie" => $actif->numero_serie,
                ];
            });

        return response()->json($actifs);
    }

    public function archivedActifs()
    {
        $statut_archived = DB::table('statut')->where('nom', 'Archivé')->first();
        $archivedActifs = Actif::with(['modele.categorie', 'statut', 'client', 'emplacement'])
            ->where('id_statut', $statut_archived->id)
            ->get()
            ->map(function ($actif) {
                return [
                    'id' => $actif->id,
                    'numero_commande' => $actif->numero_commande,
                    'numero_serie' => $actif->numero_serie,
                    'nom' => $actif->nom,
                    'modele' => $actif->modele->nom,
                    'modele_id' => $actif->modele->id,
                    'categorie' => $actif->modele->categorie->nom,
                    'categorie_id' => $actif->modele->categorie->id,
                    'statut' => $actif->statut->nom,
                    'statut_id' => $actif->statut->id,
                    'client' =>  $actif->client ? ($actif->client->prenom . ' ' . $actif->client->nom) : 'Aucun',
                    'client_id' => $actif->client ? $actif->client->id : null,
                    'emplacement' => $actif->emplacement->matricule . " - " . $actif->emplacement->nom,
                    'emplacement_id' => $actif->emplacement->id,
                ];
            });

        return response()->json($archivedActifs);
    }



    public function createActifsCommande($produit, $no_commande)
    {
        $modele_descriptif = $produit['description'];
        $id_modele = $this->findModele($modele_descriptif);
        $quantite = $produit['quantite_produit'];


        for ($i = 0; $i < $quantite; $i++) {
            $actif = new Actif;
            $actif->modele_descriptif = $modele_descriptif;
            $actif->numero_commande = $no_commande;
            $actif->en_entrepot = FALSE;
            $actif->id_statut = 2; // Always 2 in this instance, en attente de reception
            $actif->id_utilisation = 3; // 3 veut dire Autre
            if ($id_modele) {
                $actif->id_modele = $id_modele;
            }

            $actif->save();
        }

    }

    public function findModele($modele_descriptif)
    {
        $actifs = Actif::where('modele_descriptif', $modele_descriptif)->get();

        foreach ($actifs as $actif) {
            if ($actif->id_modele) {
                return $actif->id_modele;
            }
        }

        return null;
    }
    public function createMultiple(Request $request)
    {
        $data = $request->all();
        $id_modele = Modele::where('nom', $data[0]['modele'])->first()->id;
        foreach ($data as $newActif) {
            $actif = new Actif;
            $actif->numero_serie = $newActif['numero_serie'];
            $actif->adresse_mac = $newActif['adresse_mac'];
            $actif->id_modele = $id_modele;
            $actif->en_entrepot = true;
            $actif->id_statut = 3;
            $actif->id_emplacement = 1;
            $actif->save();
        }
    }
    public function showRapport($rapportName)
    {

        Log::info('showRapport function called with rapportName: ' . $rapportName);
        $data = null;
        switch ($rapportName) {
            case ("ActifsEcole"):
                $rawData = DB::table('emplacement')
                ->leftJoin('actif', 'actif.id_emplacement', '=', 'emplacement.id')
                ->join('modele', 'actif.id_modele', '=', 'modele.id')
                ->join('type_modele', 'modele.id_type_modele', '=', 'type_modele.id')
                ->select('emplacement.matricule as id', 'emplacement.nom', 'type_modele.nom as type_modele', DB::raw('count(actif.id) as typeCount'))
                ->groupBy('emplacement.id', 'emplacement.nom', 'type_modele.nom')
                ->get();

            $data = $this->cleanRepportData($rawData);
            break;
            case ("ActifsProprietaire"):
                $rawData = DB::table('emplacement')
                ->where('emplacement.est_proprietaire', '=', true)
                ->leftJoin('actif', 'actif.id_proprietaire', '=', 'emplacement.id')
                ->join('modele', 'actif.id_modele', '=', 'modele.id')
                ->join('type_modele', 'modele.id_type_modele', '=', 'type_modele.id')
                ->select('emplacement.id', 'emplacement.nom', 'type_modele.nom as type_modele', DB::raw('count(actif.id) as typeCount'))
                ->groupBy('emplacement.id', 'emplacement.nom', 'type_modele.nom')
                ->get();

            $data = $this->cleanRepportData($rawData);
                break;
            case ("ActifsType"):
                $data = DB::table('actif')
                    ->join('modele', 'actif.id_modele', '=', 'modele.id')
                    ->join('type_modele', 'modele.id_type_modele', '=', 'type_modele.id')
                    ->select('type_modele.id as Id', 'type_modele.nom as Nom', DB::raw('count(actif.id) as nbActifs'))
                    ->groupBy('type_modele.id', 'type_modele.nom')
                    ->get();
                break;
            case ("ActifsFinVieEcole"):
                $rawData = DB::table('emplacement')
                    ->leftJoin('actif', function ($join) {
                        $join->on('actif.id_emplacement', '=', 'emplacement.id')
                            ->where('actif.created_at', '<=', now()->subYears(5));
                    })
                    ->join('modele', 'actif.id_modele', '=', 'modele.id')
                    ->join('type_modele', 'modele.id_type_modele', '=', 'type_modele.id')
                    ->select('emplacement.matricule as id', 'emplacement.nom', 'type_modele.nom as type_modele', DB::raw('count(actif.id) as typeCount'))
                    ->groupBy('emplacement.id', 'emplacement.nom', 'type_modele.nom')
                    ->get();

                $data = $this->cleanRepportData($rawData);
                break;
            case ("ActifsFinVieProprietaire"):
                $rawData = DB::table('emplacement')
                    ->where('emplacement.est_proprietaire', '=', true)
                    ->leftJoin('actif', function ($join) {
                        $join->on('actif.id_proprietaire', '=', 'emplacement.id')
                            ->where('actif.created_at', '<=', now()->subYears(5));
                    })
                    ->join('modele', 'actif.id_modele', '=', 'modele.id')
                    ->join('type_modele', 'modele.id_type_modele', '=', 'type_modele.id')
                    ->select('emplacement.id', 'emplacement.nom', 'type_modele.nom as type_modele', DB::raw('count(actif.id) as typeCount'))
                    ->groupBy('emplacement.id', 'emplacement.nom', 'type_modele.nom')
                    ->get();

                $data = $this->cleanRepportData($rawData);
                break;
            case ("ActifsFinVieType"):
                $data = DB::table('actif')
                    ->join('modele', 'actif.id_modele', '=', 'modele.id')
                    ->join('type_modele', 'modele.id_type_modele', '=', 'type_modele.id')
                    ->select('type_modele.id as Id', 'type_modele.nom as Nom', DB::raw('count(actif.id) as Total'))
                    ->where('actif.created_at', '<=', now()->subYears(5))
                    ->groupBy('type_modele.id', 'type_modele.nom')
                    ->get();
                break;
            case( "Actifs"):
                $data = Actif::with(['modele.categorie', 'statut', 'client', 'emplacement'])->get()->map(function ($actif) {
                    return [
                        'Id' => $actif->id,
                        'Nom' => $actif->nom,
                        'Numero Serie' => $actif->numero_serie,
                        'Adresse Mac' => $actif->adresse_mac,
                        'Modele' => $actif->modele->nom,
                        'Categorie' => $actif->modele->categorie->nom,
                        'Statut' => $actif->statut->nom,
                        'Client' => $actif->client ? ($actif->client->prenom . ' ' . $actif->client->nom) : 'Aucun',
                        'Numero Commande' => $actif->numero_commande,
                        'Emplacement' => $actif->emplacement->matricule . " - " . $actif->emplacement->nom,
                        'Proprietaire' => $actif->proprietaire->matricule . " - " . $actif->proprietaire->nom,
                        'En Entrepot' => $actif->en_entrepot ? 'Oui' : 'Non',
                        'Note' => $actif->note,
                        'Date Retour' => $actif->date_retour,
                        'Date Creation' => $actif->created_at,
                    ];
                });

            break;

        }

        return response()->json($data);

    }
    private function cleanRepportData($rawData)
    {
        $data = [];
        foreach ($rawData as $row) {
            if (!isset($data[$row->id])) {
                $data[$row->id] = [
                    'Id' => $row->id,
                    'Nom' => $row->nom,
                    'Total' => 0, // Initialize total
                ];
            }
            $data[$row->id][$row->type_modele] = $row->typeCount;
            $data[$row->id]['Total'] += $row->typeCount;

        }

        // Move 'total' to the end of each sub-array
        foreach ($data as $id => $values) {
            if (isset($values['Total'])) {
                $total = $values['Total'];
                unset($data[$id]['Total']);
                $data[$id]['Total'] = $total;
            }
        }

        return array_values($data);
    }

}
