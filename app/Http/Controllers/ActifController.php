<?php

namespace App\Http\Controllers;



use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;
use Illuminate\Http\Request;
use DB;

class ActifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $actif = DB::table('actif')->where('id', $idActif)->first();

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
            'en_entrepot' => $data['en_entrepot'],
            'date_retour' => $data['date_retour'],
            'note' => $data['note'],
            'id_modele' => $data['id_modele'],
            'id_statut' => $data['id_statut'],
            'id_emplacement' => $data['id_emplacement'],
            'id_proprietaire' => $data['id_proprietaire'],
            'id_utilisation' => $data['id_utilisation'],
            'numero_commande' => $data['numero_commande'], //Todo add this to the form
        ];

        $updatedDataModele = [
            'id_type_modele' => $data['id_categorie'],
        ];
        $updateDataClient = [
            'id_actif' => $id,
        ];


        $client = Client::where('id_actif', $id);
        //Remove assignation from previous client
        if ($client) {
            $client->update(['id_actif' => null]);
        }
        // Update the Actif object with the updated data
        $actif->fill($updatedDataActif);
        Modele::where('id', $actif->id_modele)->update($updatedDataModele);
        Client::where('id', $data['id_assigne_a'])->update($updateDataClient);




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
        $actifs = Actif::with(['modeleCommande.modele.categorie', 'statut', 'proprietaire', 'emplacement',])->get()->map(function ($actif) {
            return [
                'id' => $actif->id,
                'numero_serie' => $actif->numero_serie,
                'nom' => $actif->nom,
                'modele' => $actif->modeleCommande->modele->nom,
                'modele_id' => $actif->modeleCommande->modele->id,
                'categorie' => $actif->modeleCommande->modele->categorie->nom,
                'categorie_id' => $actif->modeleCommande->modele->categorie->id,
                'statut' => $actif->statut->nom,
                'statut_id' => $actif->statut->id,
                'proprietaire' => $actif->proprietaire->nom,
                'proprietaire_id' => $actif->proprietaire->id,
                'emplacement' => $actif->emplacement->nom,
                'emplacement_id' => $actif->emplacement->id,
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
            'client', // Ajoutez la relation avec l'utilisateur
        ])->find($id);

        if (!$actif) {
            // L'actif n'a pas été trouvé, gérez l'erreur ici
            return response()->json(['message' => 'Actif non trouvé'], 404);
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
            'id_client' => $actif->client->id, // Ajoutez l'ID de l'utilisateur
            'en_entrepot' => $actif->en_entrepot,
            'date_retour' => $actif->date_retour,
            'note' => $actif->note,
        ];


        return response()->json($data);
    }

    public function lightShow()
    {
        $actifs = Actif::All()->map(function ($actif) {
            return [
                "id" => $actif->id,
                "nom" => $actif->nom,
                "numero_serie" => $actif->numero_serie,
            ];
        });
        return response()->json($actifs);
    }

}
