<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Modele;

class ModeleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function get($id)
    {
        $modele = Modele::find($id);
        return response()->json($modele);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{}
    public function createNew(Request $request)
    {
        $data = $request->all();
        $modele = new Modele();
        $modele->nom = $data['nom'];
        $modele->stockage = $data['stockage'] ?? "";
        $modele->processeur = $data['processeur']?? "";
        $modele->memoire_vive = $data['memoire_vive']?? "";
        $modele->taille = $data['taille']?? "";
        $modele->id_type_modele = $data['id_type_modele'];
        $modele->favoris = $data['favoris']?? false;
        $modele->save();

        return response()->json(['message' => 'Modèle créé avec succès'], 200);

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
    public function show(Modele $modele)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Modele $modele)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $data = $request->all();

        $updatedDataModel = [
            'nom' => $data['nom'],
            'stockage' => $data['stockage'],
            'processeur' => $data['processeur'],
            'memoire_vive' => $data['memoire_vive'],
            'taille' => $data['taille'],
            'id_type_modele' => $data['id_type_modele'],
            'favoris' => $data['favoris'],
        ];

        $modele = Modele::find($id);

        if($modele){
            $modele->update($updatedDataModel);
            return response()->json(['message' => 'Modèle mise à jour avec succès'], 200);
        }
        else{
            return response()->json(['message' => 'Modèle non trouvé'], 404);
        }

    }
    public function updateFavoris(Request $request, $id)
    {
        $modele = Modele::find($id);

        $favoris = 0;
        if($modele['favoris'] == 1){
            $favoris = 0;
        }
        else{
            $favoris = 1;
        }


        $modele->favoris = $favoris;
        if($modele){
            $modele->save();
            return response()->json(['message' => 'Modèle mise à jour avec succès'], 200);
        }
        else{
            return response()->json(['message' => 'Modèle non trouvé'], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modele $modele)
    {
        //
    }
    public function showAll()
    {
        $modeles = Modele::with('categorie')->get()->map(function ($modele) {
            return [
                "id" => $modele->id,
                "nom" => $modele->nom,
                "stockage" => $modele->stockage,
                "processeur" => $modele->processeur,
                "memoire_vive" => $modele->memoire_vive,
                "taille" => $modele->taille,
                "id_type_modele" => $modele->id_type_modele,
                "favoris" => $modele->favoris ? true : false,
                "categorie" => $modele->categorie->nom,
            ];
        });        return response()->json($modeles);
    }

    public function lightShow()
    {
        $modeles = Modele::All()->map(function ($modele) {
            return [
                "id" => $modele->id,
                "nom" => $modele->nom,
            ];
        });
        return response()->json($modeles);
    }
}
