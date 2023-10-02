<?php

namespace App\Http\Controllers;

use App\Models\Actif;
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
                'id_modele_commande' => 'required',
                'id_statut' => 'required',
                'id_emplacement' => 'required',
                'id_proprietaire' => 'required',
                'id_utilisation' => 'required',
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
            // Recherchez l'actif par ID
            $actif = Actif::findOrFail($id);

            // Validez les données du formulaire
            $validatedData = $request->validate([
                'numero_serie' => 'required|max:255',
                'nom' => 'required|max:255',
                'en_entrepot' => 'required|in:1,0',
                'adresse_mac' => 'nullable|max:255',
                'date_retour' => 'nullable|date',
                'note' => 'nullable',
                'id_modele_commande' => 'required', // Assurez-vous que cette clé est incluse si elle est requise
                'id_statut' => 'required',
                'id_emplacement' => 'required',
                'id_proprietaire' => 'required',
                'id_utilisation' => 'required',
            ]);

            // Mettez à jour l'actif en utilisant les données validées
            $actif->update($validatedData);

            // Retournez une réponse JSON pour indiquer le succès
            return response()->json(['message' => 'Actif mis à jour avec succès'], 200);
        } catch (\Exception $e) {
            // En cas d'exception, retournez une réponse d'erreur avec le message d'erreur
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
            'modeleCommande.modele.categorie',
            'client', // Ajoutez la relation avec l'utilisateur
        ])->find($id);

        if (!$actif) {
            // L'actif n'a pas été trouvé, gérez l'erreur ici
            return response()->json(['message' => 'Actif non trouvé'], 404);
        }

        // Maintenant, vous pouvez accéder au nom de l'utilisateur assigné à l'actif
        $actifData = [
            'numero_serie' => $actif->numero_serie,
            'nom' => $actif->nom,
            'categorie' => $actif->modeleCommande->modele->categorie->nom,
            'modele' => $actif->modeleCommande->modele->nom,
            'emplacement' => $actif->emplacement->nom,
            'est_en_entrepot' => $actif->en_entrepot,
            'adresse_mac' => $actif->adresse_mac,
            'statut' => $actif->statut->nom,
            'proprietaire' => $actif->proprietaire->nom,
            'utilisation' => $actif->utilisation->nom,
            'date_retour' => $actif->date_retour,
            'note' => $actif->note,
            'assigne_a' => $actif->client->nom, // Ajoutez le nom du client assigné
            'date_creation' => $actif->created_at,
        ];

        return response()->json($actifData);
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

   
