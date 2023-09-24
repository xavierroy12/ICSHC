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
        //
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
    public function update(Request $request, Actif $Actif)
    {
        //
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
}