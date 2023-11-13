<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\User;
use App\Models\Actif;


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
                if ($actif->$field != $newValue) {
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
                    $log->save();
                }
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
