<?php

namespace App\Http\Controllers;



use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;
use App\Models\Statut;
use Picqer\Barcode\BarcodeGeneratorHTML;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use SplFileObject;

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
        try {
            $actifs = Actif::with(['modele.categorie', 'statut', 'client', 'emplacement'])
            ->whereHas('statut', function ($query) {
                $query->where('nom', '!=', 'Archivé');
            })
            ->get()
            ->map(function ($actif) {
                return [
                    'id' => $actif->id ?? "Non définie",
                    'numero_commande' => $actif->numero_commande,
                    'numero_serie' => $actif->numero_serie,
                    'nom' => $actif->nom,
                    'modele' => $actif->modele->nom ?? "Aucun",
                    'categorie' => $actif->modele->categorie->nom ?? "Non définie",
                    'statut' => $actif->statut->nom,
                    'client' => $actif->client ? ($actif->client->prenom . ' ' . $actif->client->nom) : 'Aucun',
                    'emplacement' => $actif->emplacement ? ($actif->emplacement->matricule . " - " . $actif->emplacement->nom) : '000 - Aucun emplacement',
                ];
            });
            return response()->json($actifs);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve actifs: ' . $e->getMessage()], 500);
        }
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
        
        
        
        public function createActifsCommande($produit, $no_commande, $emplacement)
        {
            $modele_descriptif = 'Nom : ' . $produit['nom_produit']  . " Description : " . $produit['description'];
            $id_modele = $this->findModele($modele_descriptif);
            $quantite = $produit['quantite_produit'];
            
            
            for ($i = 0; $i < $quantite; $i++) {
                $actif = new Actif;
                $actif->nom = "Non défini";
                $actif->modele_descriptif = $modele_descriptif;
                $actif->numero_commande = $no_commande;
                $actif->en_entrepot = FALSE;
                $actif->id_statut = 2; // Always 2 in this instance, en attente de reception
                $actif->id_utilisation = 3; // 3 veut dire Autre
                $actif->id_emplacement = $emplacement;
                if ($id_modele) {
                    $actif->id_modele = $id_modele;
                }
                log::info('Actif: ' . $actif);
                $actif->save();
            }
            
        }
        
        public function findModele($modele_descriptif)
        {
            log::info('Modele descriptif: ' . $modele_descriptif);
            $actifs = Actif::where('modele_descriptif', $modele_descriptif)->get();
            
            foreach ($actifs as $actif) {
                if ($actif->id_modele) {
                    Log::info("in the if statement");
                    return $actif->id_modele;
                }
            }
            
            return null;
        }
        public function createMultiple(Request $request)
        {
            Log::info('createMultiple function called');
            $data = $request->all(); 
            $id_modele = Modele::where('nom', $data[0]['modele'])->first()->id;
            foreach ($data as $newActif) {
                $actif = new Actif;
                $actif->nom = $newActif['nom'];
                $actif->numero_serie = $newActif['numero_serie'];
                $actif->adresse_mac = $newActif['adresse_mac'];
                $actif->id_modele = $id_modele;
                $actif->en_entrepot = true;
                $actif->id_statut = 3;
                $actif->id_emplacement = 1;
                try {
                    $actif->save();
                } catch (\Exception $e) {
                    \Log::error('Failed to save actif: ' . $e->getMessage());
                }
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
                                    
                                    
                                    //Cette méthode a pour but de créer un actif à partir d'un script powershell lors du F12 d'un ordinateur
                                    public function modifierParF12(Request $request)
                                    {
                                        $data = $request->all();
                                        Log::info('Data: ', $data);
                                        
                                        $nom = $data['nom'] ?? "aucun nom trouver en F12";
                                        $numero_serie = $data['numero_serie'];
                                        
                                        $actif = Actif::where('numero_serie', $numero_serie)->first();
                                        
                                        if ($actif) {
                                            $actif->nom = $nom;
                                            $actif->save();
                                            http_response_code(200); // Success
                                            Log::info('Actif modified successfully');
                                            return response()->json(['message' => 'Actif modified successfully']);
                                        } else {
                                            http_response_code(404); // Not Found
                                            Log::info('Actif not found in inventory');
                                            return response()->json(['message' => 'Actif not found in inventory, cannot be modified']);
                                        }
                                    }
                                    
                                    public function createActifFromImport($assetName, $serial, $purchased, $location, $checkedOut, $oldStatus, $notes, $id_modele, $propriete_si, $macAdress, $propriete, $client)
                                    {
                                        //On vérifie si l'actif existe déjà dans la base de données, si oui on quitte la fonction
                                        $actif = Actif::where('numero_serie', $serial)->first();
                                        if($actif != null){
                                            Log::info('Actif found in database, not creating new one');
                                            return;
                                        }
                                        
                                        // Mapping of old status strings to new status names
                                        $statusMapping = [
                                            'Déployable' => 'Déployable',
                                            'A LOCALISER' => 'Perdu',
                                            'En attente' => 'En réparation',
                                            'A réparer' => 'En réparation',
                                            'A ré-imager' => 'En réparation',
                                            'Déployable Déployé' => 'Déployé',
                                            'Distribué' => 'Déployé',
                                            'En préparation' => 'Déployable',
                                            'NON TROUVÉ' => 'Perdu',
                                            'Pour pièces' => 'Hors service',
                                            'Recu' => 'Déployable',
                                            'Retiré' => 'Archivé',
                                            // Add more mappings as needed...
                                        ];
                                        
                                        // Find the new status name based on the old status string
                                        $newStatusName = $statusMapping[$oldStatus] ?? 'Inconnue';
                                        //Set en_entrepot
                                        if($newStatusName == 'Déployable' || $newStatusName == 'En réparation' || $newStatusName == 'Hors service' || $newStatusName == 'Archivé'){
                                            $entreposer = True;
                                        }
                                        else{
                                            $entreposer = False;
                                        }
                                        // Fetch the id of the Statut with the new status name
                                        $status = Statut::firstWhere('nom', $newStatusName);
                                        $id_statut = $status ? $status->id : null;
                                        
                                        
                                        
                                        //On call une method pour aller chercher l'id emplacement
                                        if($location == 'Utilisateurs Inactifs')
                                        {
                                            $id_emplacement = $this->findIdUtilisateurInactif();
                                        }
                                        else if($location == 'Équipe volante'){
                                            Log::error('is this it ?' . $propriete);
                                            $id_emplacement = $this->findIdEquipeVolante();
                                        }
                                        else if($location != null){
                                            $id_emplacement = $this->splitNomEmplacement($location);
                                        }
                                        else{
                                            Log::info('No emplacement found');
                                            $id_emplacement = null;
                                        }
                                        
                                        
                                        
                                        //Gerer proprietaire SI
                                        if ($propriete_si != null && $propriete_si == 'oui') {
                                            $id_proprietaire = $this->findIdServiceInformatique();
                                        } 
                                        else if($propriete != null) {
                                            if($propriete == 'Service Informatique'){
                                                $id_proprietaire = $this->findIdServiceInformatique();
                                            }
                                            else if($propriete == 'Service Éducatif'){
                                                $id_proprietaire = $this->findIdServiceEducatif();
                                            }
                                            else if($propriete == 'Projet EER'){
                                                $id_proprietaire = $this->findIdEER();
                                            }
                                            else{
                                                Log::error('this is where the error is support to pop : ' . $propriete);
                                                $id_proprietaire = $this->splitNomEmplacement($propriete);
                                            }
                                        }
                                        else{
                                            Log::info('No proprietaire found');
                                            $id_proprietaire = null;
                                        }
                                        
                                        
                                        Log::error('client before pregmatch is : ' . $client);
                                        if (preg_match('/^\d{3}/', $client) || $client == null) {
                                            Log::info('Client is emplacement or null : ' . $client);
                                            $id_client = null;
                                        } else {
                                            $id_client = $this->splitNomClient($client);
                                        }
                                        
                                        
                                        
                                        
                                        $actif = Actif::create([
                                            'numero_serie' => $serial, //ok
                                            'nom' => $assetName, //ok
                                            'en_entrepot' => $entreposer, //ok
                                            'adresse_mac' => $macAdress, //ok
                                            'note' => $notes, //ok
                                            'id_modele' => $id_modele, //ok
                                            'id_statut' => $id_statut, //ok
                                            'id_emplacement' => $id_emplacement, //oik
                                            'id_proprietaire' => $id_proprietaire, //ok
                                            'id_client' => $id_client, //ok
                                            'numero_commande' => null,
                                        ]);
                                        
                                        
                                        
                                        /* Info nécessaire pour créer un actif:
                                            Nom
                                            Numero de serie
                                            statut
                                            Modele
                                            catégorie (de modele)
                                            checked out to (Might be emplacement)
                                            Est en entrepôt 
                                            propriété (might be null)
                                            num de commande (check to make null)
                                            date creation 
                                            date retour (might be null)
                                            */
                                            
                                        }
                                        private function findIdServiceInformatique(){
                                            $SI_emplacement = DB::table('emplacement')
                                            ->where('matricule', '999')
                                            ->first();
                                            
                                            if ($SI_emplacement) {
                                                // If the emplacement was found, use its id
                                                $id_proprietaire = $SI_emplacement->id;
                                            } else {
                                                Log::info('Emplacement with matricule 999 not found');
                                                $id_proprietaire = null;
                                            }
                                            return $id_proprietaire;
                                        }
                                        
                                        private function findIdUtilisateurInactif(){
                                            $UI_emplacement = DB::table('emplacement')
                                            ->where('matricule', '998')
                                            ->first();
                                            
                                            if ($UI_emplacement) {
                                                // If the emplacement was found, use its id
                                                $id_emplacement = $UI_emplacement->id;
                                            } else {
                                                Log::info('Emplacement with matricule 998 not found');
                                                $id_emplacement = null;
                                            }
                                            return $id_emplacement;
                                        }
                                        
                                        private function findIdServiceEducatif(){
                                            $UI_emplacement = DB::table('emplacement')
                                            ->where('matricule', '997')
                                            ->first();
                                            
                                            if ($UI_emplacement) {
                                                // If the emplacement was found, use its id
                                                $id_emplacement = $UI_emplacement->id;
                                            } else {
                                                Log::info('Emplacement with matricule 997 not found');
                                                $id_emplacement = null;
                                            }
                                            return $id_emplacement;
                                        }
                                        
                                        private function findIdEER(){
                                            $UI_emplacement = DB::table('emplacement')
                                            ->where('matricule', '996')
                                            ->first();
                                            
                                            if ($UI_emplacement) {
                                                // If the emplacement was found, use its id
                                                $id_emplacement = $UI_emplacement->id;
                                            } else {
                                                Log::info('Emplacement with matricule 996 not found');
                                                $id_emplacement = null;
                                            }
                                            return $id_emplacement;
                                        }
                                        
                                        private function findIdEquipeVolante(){
                                            $UI_emplacement = DB::table('emplacement')
                                            ->where('matricule', '995')
                                            ->first();
                                            if ($UI_emplacement) {
                                                // If the emplacement was found, use its id
                                                $id_emplacement = $UI_emplacement->id;
                                            } else {
                                                Log::info('Emplacement with matricule 996 not found');
                                                $id_emplacement = null;
                                            }
                                            return $id_emplacement;
                                        }
                                        
                                        private function splitNomEmplacement($nomEmplacement)
                                        {
                                            Log::info('Attemping to split emplacement : ' . $nomEmplacement);
                                            list($matricule, $nom) = explode(' - ', $nomEmplacement);
                                            // Trim the values to remove any extra spaces
                                            $matricule = trim($matricule);
                                            $nom = trim($nom);
                                            // Query the database to find the id
                                            $emplacement = DB::table('emplacement')
                                            ->where('matricule', $matricule)
                                            ->first();
                                            
                                            if ($emplacement) {
                                                // If the emplacement was found, use its id
                                                $id_emplacement = $emplacement->id;
                                                return $id_emplacement;
                                            } else {
                                                Log::info('Emplacement not found: ' . $nomEmplacement);
                                            }
                                        }
                                        
                                        private function splitNomClient($fullName){
                                            Log::info('Client name: ' . $fullName);
                                            // Split the full name into first name and last name
                                            list($prenom, $nom) = explode(' ', $fullName, 2);
                                            
                                            // Query the database to get the client
                                            $client = DB::table('client')
                                            ->where('prenom', $prenom)
                                            ->where('nom', $nom)
                                            ->first();
                                            
                                            // Check if the client was found
                                            if ($client) {
                                                // If the client was found, use its id
                                                $id_client = $client->id;
                                            } else {
                                                Log::info('Client with name ' . $client . ' not found');
                                                $id_client = null;
                                            }
                                            return $id_client;
                                        }
                                        public function generateLabel($id)
                                        {
                                            // Find the actif by ID
                                            log::info('in generate label');

                                            $actif = Actif::find($id);
                                            if ($actif) {
                                                // Generate a barcode for the actif's serial number
                                                $generator = new BarcodeGeneratorHTML();
                                                $barcode = $generator->getBarcode($actif->numero_serie, $generator::TYPE_CODE_128);

                                                // Return a view with the label
                                                return view('label', ['actif' => $actif, 'barcode' => $barcode]);
                                            }

                                        }
                                    }
