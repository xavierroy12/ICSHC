<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use App\Http\Controllers\ActifController;
use App\Models\Emplacement;


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
    public function lightShow()
    {
        $commandes = Commande::All()->map(function ($commande) {
            return [
                "id" => $commande->id,
                "nom" => $commande->nom,
            ];
        });
        return response()->json($commandes);
    }

    public function recepCommandeAchat(Request $request)
    {
        $actifController = new ActifController;

        error_log('Reception de la commande d\'achat');
        $data = json_decode($request->getContent(), true);
        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['error' => 'Unable to decode JSON'], 400);
        }

        //Creating Commande
        if(isset($data["date_creation"])){

            $quantiteTotal = 0;
            foreach($data["produits"] as $produit){
                $quantite = $produit["quantite_produit"];
                $quantiteTotal = $quantiteTotal + $quantite;
            }
            $matricule_emplacement = $data["matricule_emplacement"];
            $emplacement_id = Emplacement::where('matricule', $matricule_emplacement)->first()->id;

            $commande = new Commande;
            $commande->date_commande = $data["date_creation"];
            $commande->numero_commande = $data["no_commande"];
            $commande->nb_actif = $quantiteTotal;
            $commande->id_emplacement_prevu = $emplacement_id;
            $commande->id_etat = 1; //1 = en cours de livraison
            $commande->save();
        }
        else{
            error_log('Failed to decode data into an array');
        }

        //Creating actifs
            if (isset($data['produits'])) {
                $produits = $data['produits'];
                error_log('Produits: ' . print_r($produits, true));
                foreach ($produits as $produit) {
                    $actifController->createActifsCommande($produit, $data["no_commande"]);
                }
            }


         else {
            error_log('Failed to decode data into an array');

        }

        return response()->json(['success' => 'Commande d\'achat reçue'], 200);
       


        
    }
}
