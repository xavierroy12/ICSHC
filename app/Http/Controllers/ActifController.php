<?php

namespace App\Http\Controllers;



use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;
use Illuminate\Http\Request;

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

            //request object with all possible fields, if not set, set to null
            $requestData = [
                'en_entrepot' => isset($data['en_entrepot']) ? $data['en_entrepot'] : null,
                'date_retour' => isset($data['date_retour']) ? $data['date_retour'] : null,
                'note' => isset($data['note']) ? $data['note'] : null,
                'id_modele' => isset($data['modele']) ? $data['modele'] : null,
                'id_categorie' => isset($data['categorie']) ? $data['categorie'] : null,
                'id_statut' => isset($data['statut']) ? $data['statut'] : null,
               // 'id_assigne_a' => isset($data['desasignation']) ? $data['id_assigne_a'] : null,
                'id_emplacement' => isset($data['emplacement']) ? $data['emplacement'] : null,
                'id_proprietaire' => isset($data['proprietaire']) ? $data['proprietaire'] : null,
                'id_utilisation' => isset($data['utilisation']) ? $data['utilisation'] : null,
            ];
            $filteredData = array_filter($requestData, function ($value) {
                return $value !== null;
            });
            /*$updatedDataModele = [
                'id_type_modele' => isset($data['id_categorie']) ? $data['id_categorie'] : null,
            ];*/





            //update each actif with the request data
            foreach ($arrayIdActifs as $id) {
                // Get the Actif object to update
                $actif = Actif::findOrFail($id);
                if($requestData['id_categorie'])
                {
                    $updatedDataModele = [
                        'id_type_modele' => $requestData['id_categorie'],
                    ];
                    Modele::where('id', $actif->id_modele)->update($updatedDataModele);
                }

                $client = Client::where('id_actif', $id);

                //Remove assignation from previous client
                if ($data['desasignation']) {
                    $client->update(['id_actif' => null]);
                }
                if (!$actif->update($filteredData)) {
                    return response()->json(['message' => 'Erreur lors de la mise à jour de l\'actif'], 500);
                }
            }
            $actif->save();
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
            'id_client'=> $data['id_assigne_a']
            //'numero_commande' => $data['numero_commande'], //Todo add this to the form
        ];

        $updatedDataModele = [
            'id_type_modele' => $data['id_categorie'],
        ];

        // Update the Actif object with the updated data
        $actif->fill($updatedDataActif);
        Modele::where('id', $actif->id_modele)->update($updatedDataModele);




        // Check if the Actif object is actually updated
        print_r($actif);

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
                $query->where('nom', '!=', 'Archivé')
                      ->where('id_statut', '!=', 2);


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
                    'emplacement' => $actif->emplacement->nom,

                ];
            });
            error_log($actifs);
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

        // Check if the actif's statut is "Archivé" and return an empty response or handle it as needed.
        if ($actif->statut->nom === 'Archivé') {
            return response()->json(['message' => 'Cet actif est archivé'], 404);
        }

        $data = [
            'numero_serie' => $actif->numero_serie,
            'nom' => $actif->nom,
            'adresse_mac' => $actif->adresse_mac,
            'id_modele' => $actif->modele->id,
            'id_categorie' => $actif->modele->categorie->id,
            'id_statut' => $actif->statut->id,
            'id_utilisation' => $actif->utilisation->id,
            'id_proprietaire' => $actif->proprietaire->id,
            'id_emplacement' => $actif->emplacement->id,
            'id_client' => $actif->client->id ?? null,
            'en_entrepot' => $actif->en_entrepot,
            'date_retour' => $actif->date_retour,
            'note' => $actif->note,
            'numero_commande' => $actif->numero_commande,
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
    $archivedActifs = Actif::with(['modele.categorie', 'statut', 'client', 'emplacement'])
        ->where('id_statut', 5)
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
                'client' => $actif->client->prenom . ' ' . $actif->client->nom ?? 'Aucun',
                'client_id' => $actif->client->id,
                'emplacement' => $actif->emplacement->nom,
                'emplacement_id' => $actif->emplacement->id,
            ];
        });

    return response()->json($archivedActifs);
}



    Public function createActifsCommande($produit, $no_commande)
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


}
