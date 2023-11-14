<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\User;
use App\Models\Actif;
use App\Models\Client;


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
        $id = substr($path, -1);
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
                //Handling exceptions, if the field is categorie, we need to get the categorie of the modele of the actif
                if ($field == 'id_categorie') {
                    if ($actif->modele->categorie->id == $newValue) {
                        continue;
                    }
                    $log->old_value = $actif->modele->categorie->id;
                }
                if ($field == 'id_client') {
                    //To-do: call the logClient for a desasignation and assignation log. Here we are just creating the log for the actif
                    $client = Client::where('matricule', $requestData['id_client'])->first();
                    //to-do: check why the assignation wont save.
                    $log->new_value = $client->id;

                }
                $log->save();
            }
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
