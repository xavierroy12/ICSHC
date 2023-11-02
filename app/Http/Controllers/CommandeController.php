<?php

namespace App\Http\Controllers;

use App\Models\Actif;
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
    public function show($numero_commande)
    {
        $actif = Actif::where('numero_commande', $numero_commande)->get()->map(
            function ($actif)
            {
                return[
                    "id" => $actif->id,
                    'numero_serie' => $actif->numero_serie,
                    'adresse_mac' => $actif->adresse_mac,
                    'modele' => $actif->modele->nom,
                    'description_modele' => $actif->modele_descriptif
                ];
            }
        );

        $c = Commande::where('numero_commande', $numero_commande)->first();
        $commande = [
            "numero_commande" => $c->numero_commande,
            "etat" => $c->etat->nom,
            "nb_actif"=> $c->nb_actif,
            "emplacement" => $c->emplacement_prevu,
            "date_commande" => $c->date_commande,
            "actifs" => $actif
        ];
        return response()->json($commande);
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

    public function reception(Request $request, $numero_commande)
    {
        //loop sur les actifs et set le model, numero de serie, mac adress, localisation, status

        $commande = Commande::where('numero_commande', $numero_commande)->first();
        $commande->etat_id = 2;
        $this->updateRemote($commande->numero_commande, $commande->etat_id);
        $commande->save();
        return response()->json($commande);
    }
    public function updateRemote($numero_commande, $etat)
    {
        //change URL
        $url = "http://localhost:8000/api/commandes/".$numero_commande;
        $data = array('etat_id' => $etat);
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/json\r\n",
                'method'  => 'PUT',
                'content' => json_encode($data)
            )
        );
        //verify how to put data in php
        $context  = stream_context_create($options);
        return file_get_contents($url, false, $context);
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
