<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
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
    public function show(Commande $commande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commande $commande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $commande)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $commande)
    {
        //
    }
    public function showAll()
    {
        $commandes = Commande::all();
        return response()->json($commandes);
    }

    public function listShow()
    {
        $commandes = Commande::with(['etat'])->get()->map(function ($commande) {
            return [
                "numero_commande" => $commande->numero_commande,
                "etat" => $commande->etat->nom,
                "nb_actif"=> $commande->nb_actif,
                "emplacement" => $commande->emplacement_prevu,
                "date_commande" => $commande->date_commande,
            ];
        });
        return response()->json($commandes);
    }
}
