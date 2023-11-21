<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\User;
use App\Models\Actif;
use App\Models\Client;
use App\Models\Modele;


class LogController extends Controller
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

    public function listJson()
    {
        $logs = Log::all();
        return response()->json($logs);
    }

    public function logRequestUnspecific(Request $request)
    {

        Log::create([
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'action' => 'API Request',
            'user' => '$request->user() ? $request->user()->name : null,',
            // 'client' => $client->name, // Add this if you have a client
            // 'actif' => $actif->name, // Add this if you have an actif
            // 'location' => $location->name, // Add this if you have a location
        ]);
    }

    public function logActifs($request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $data = $request->all();
        $arrayIdActifs = $data['ids'];
        $requestData = [
            'en_entrepot' => isset($data['en_entrepot']) ? $data['en_entrepot'] : null,
            'date_retour' => isset($data['date_retour']) ? $data['date_retour'] : null,
            'note' => isset($data['note']) ? $data['note'] : null,
            'id_modele' => isset($data['modele']) ? $data['modele'] : null,
            'id_categorie' => isset($data['categorie']) ? $data['categorie'] : null,
            'id_statut' => isset($data['statut']) ? $data['statut'] : null,
            'id_emplacement' => isset($data['emplacement']) ? $data['emplacement'] : null,
            'id_proprietaire' => isset($data['proprietaire']) ? $data['proprietaire'] : null,
            'id_utilisation' => isset($data['utilisation']) ? $data['utilisation'] : null,
        ];
        foreach ($arrayIdActifs as $id) {
            $actif = Actif::find($id);

            foreach ($requestData as $field => $newValue) {
                if ($actif->$field != $newValue && $newValue != null) {
                    error_log('field is ' . $field . ' and newValue is ' . $newValue);
                    $log = new Log([
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                        'action' => 'modifier',
                        'field' => $field,
                        'old_value' => $actif->$field,
                        'new_value' => $newValue,
                        'id_user' => $modificateur,
                        'id_actif' => $id,
                    ]);
                    if ($field == 'id_categorie') {
                        if ($actif->modele->categorie->id == $newValue)
                            break;
                        $log->old_value = $actif->modele->categorie->id;
                    }
                    $log->save();
                }
            }
        }
    }

    public function logActif($request)
    {
        //set the variable needed
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $id = basename($path);
        $actif = Actif::find($id);
        $data = $request->all();
        //set the data to be logged
        $requestData = [
            'nom' => isset($data['nom']) ? $data['nom'] : null,
            'numero_serie' => isset($data['numero_serie']) ? $data['numero_serie'] : null,
            'id_categorie' => isset($data['id_categorie']) ? $data['id_categorie'] : null,
            'en_entrepot' => isset($data['en_entrepot']) ? $data['en_entrepot'] : null,
            'date_retour' => isset($data['date_retour']) ? $data['date_retour'] : null,
            'note' => isset($data['note']) ? $data['note'] : null,
            'id_client' => isset($data['id_assigne_a']) ? $data['id_assigne_a'] : null,
            'id_modele' => isset($data['id_modele']) ? $data['id_modele'] : null,
            'id_statut' => isset($data['id_statut']) ? $data['id_statut'] : null,
            'id_emplacement' => isset($data['id_emplacement']) ? $data['id_emplacement'] : null,
            'id_proprietaire' => isset($data['id_proprietaire']) ? $data['id_proprietaire'] : null,
            'id_utilisation' => isset($data['id_utilisation']) ? $data['id_utilisation'] : null,
        ];
        //for each field in the request, check if it is different from the current value and if it is, log it
        foreach ($requestData as $field => $newValue) {
            if ($actif->$field != $newValue && $newValue != null) {
                error_log('field is ' . $field . ' and newValue is ' . $newValue . ' and oldValue is ' . $actif->$field);
                $log = new Log([
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'action' => 'modifier',
                    'field' => $field,
                    'old_value' => $actif->$field,
                    'new_value' => $newValue,
                    'id_user' => $modificateur,
                    'id_actif' => $id,
                ]);
                //Handling exceptions, if the field is categorie, we need to get the categorie of the modele of the actif
                if ($field == 'id_categorie') {
                    if ($actif->modele->categorie->id == $newValue) {
                        continue;
                    }
                    $log->old_value = $actif->modele->categorie->id;
                }
                if ($field == 'id_client') {
                    error_log('id_client');
                    //To-do: call the logClient for a desasignation and assignation log. Here we are just creating the log for the actif
                    $client = Client::where('matricule', $requestData['id_client'])->first();
                    //to-do: check why the assignation wont save.
                    error_log('client id ' . $client->id);
                    $log->new_value = $client->id;
                    error_log('log is : ' . $log);

                    $logAssignation = new Log([
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                        'action' => 'assignation',
                        'field' => 'id_client',
                        'old_value' => null,
                        'new_value' => $client->id,
                        'id_user' => $modificateur,
                        'id_actif' => $id,
                    ]);
                    $logDesassignation = new Log([
                        'url' => $request->fullUrl(),
                        'method' => $request->method(),
                        'action' => 'desassignation',
                        'field' => 'id_client',
                        'old_value' => $actif->client->id,
                        'new_value' => null,
                        'id_user' => $modificateur,
                        'id_actif' => $id,
                    ]);
                    $logAssignation->save();
                    $logDesassignation->save();
                }
                $log->save();
            }
        }
    }



    public function logAssignation(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idClient = basename($path);
        //$client = Client::find($idClient);
        $actifClients = $actifs = Actif::where('id_client', $idClient)->get();
        $actifsRequestIds = $request->input('actifs');
        $actifClientsIds = $actifClients->pluck('id')->toArray();

        $addedIds = array_diff($actifsRequestIds, $actifClientsIds);
        $removedIds = array_diff($actifClientsIds, $actifsRequestIds);

        foreach ($addedIds as $id) {
            $log = new Log([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'action' => 'assignation',
                'field' => 'id_client',
                'old_value' => null,
                'new_value' => $idClient,
                'id_user' => $modificateur,
                'id_actif' => $id,
            ]);
            $log->save();
        }

        foreach ($removedIds as $id) {
            $log = new Log([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'action' => 'desassignation',
                'field' => 'id_client',
                'old_value' => $idClient,
                'new_value' => null,
                'id_user' => $modificateur,
                'id_actif' => $id,
            ]);
            $log->save();
        }
    }

    public function logFavoris(Request $request)
    {
        error_log($request);
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idModele = basename($path);
        $modele = Modele::find($idModele);

        error_log($modele);
        $log = new Log([
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'action' => 'ajoutFavoris',
            'field' => 'favoris',
            'old_value' => False,
            'new_value' => True,
            'id_user' => $modificateur,
            'id_modele' => $idModele,
        ]);
        if ($modele->favoris == True) {
            $log->action = 'retraitFavoris';
            $log->new_value = False;
            $log->old_value = True;
        }

        $log->save();
    }

    public function logModele(Request $request)
    {
        $modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $idModele = basename($path);
        $modele = Modele::find($idModele);
        error_log($request);

        $data = $request->all();
        //set the data to be logged
        $requestData = [
            'id' => isset($data['id']) ? $data['id'] : null,
            'nom' => isset($data['nom']) ? $data['nom'] : null,
            'id_type_modele' => isset($data['id_type_modele']) ? $data['id_type_modele'] : null,
            'stockage' => isset($data['stockage']) ? $data['stockage'] : null,
            'processeur' => isset($data['processeur']) ? $data['processeur'] : null,
            'memoire_vive' => isset($data['memoire_vive']) ? $data['memoire_vive'] : null,
            'favoris' => isset($data['favoris']) ? $data['favoris'] : null,
            'taille' => isset($data['taille']) ? $data['taille'] : null,
        ];

        foreach ($requestData as $field => $newValue) {
            if ($modele->$field != $newValue && $newValue != null) {
                error_log('field is ' . $field . ' and newValue is ' . $newValue . ' and oldValue is ' . $modele->$field);
                $log = new Log([
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'action' => 'modifier',
                    'field' => $field,
                    'old_value' => $modele->$field,
                    'new_value' => $newValue,
                    'id_user' => $modificateur,
                    'id_modele' => $idModele,
                ]);
                $log->save();
            }
        }
    }

    public function logCategorie(Request $request)
    {
        /*$modificateur = $request->header('X-User-Action-Id');
        $path = $request->path();
        $log = new Log([

        ])*/
    }


    public function showLogs(Request $request)
    {
        $typeItem = $request->input('type');
        $id_item = $request->input('id_item');
        $logs = [];
        $logsReturned = [];
        $relationships = ['actif', 'client', 'modele', 'user'];

        // Return all actif logs
        if ($typeItem == 'actif') {
            $logs = Log::where('id_actif', $id_item)->with($relationships)->get();
            return response()->json($logs);
        }
        // Return all client logs
        if ($typeItem == 'client') {
            $logs = Log::where('id_client', $id_item)->with($relationships)->get();
            return response()->json($logs);
        }
        // Return all modele logs
        if ($typeItem == 'modele') {
            $logs = Log::where('id_modele', $id_item)->with($relationships)->get();
            return response()->json($logs);
        }
        // Return all user logs
        if ($typeItem == 'user') {
            $logs = Log::where('id_user', $id_item)->with($relationships)->get();
            return response()->json($logs);
        }

        foreach($logs as $log){
            if($this->isForeignKey($log->field)){
                $log->old_value = $this->getFieldValue($log->old_value, $log->field);
                $log->new_value = $this->getFieldValue($log->new_value, $log->field);
                $champ = substr($log->field, 3);
            }
            else{
                $champ = $log->field;
            }
            $old_value = $log->old_value !== null ? $log->old_value : 'rien';
            $new_value = $log->new_value !== null ? $log->new_value : 'rien';

            $description = $log->action . ' ' . $champ . ' de ' . $log->old_value . ' à ' . $log->new_value;
            $utilisateur = $log->user->nom;

            $data = [
                'date' => $log->created_at,
                'description' => $description,
                'utilisateur' =>$utilisateur,
            ];

            array_push($logsReturned, $data);
        }

        return response()->json($logsReturned);
    }

    public function isForeignKey($field){
        return substr($field, 0, 2) == 'id';
    }

    public function getFieldValue($value, $typeItem){
        if($typeItem == 'actif'){
            $actif = Actif::find($value);
            return $actif->nom;
        }
        if($typeItem == 'client'){
            $client = Client::find($value);
            return $client->nom;
        }
        if($typeItem == 'modele'){
            $modele = Modele::find($value);
            return $modele->nom;
        }
        if($typeItem == 'user'){
            $user = User::find($value);
            return $user->name;
        }
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
