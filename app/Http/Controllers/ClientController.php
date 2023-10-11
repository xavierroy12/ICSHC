<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Actif;
class ClientController extends Controller
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
    public function show($id)
    {
        $client = Client::with(['actif', 'emplacement', 'poste', 'type_client'])->find($id);

        return response()->json($client);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
    public function showAll()
    {
        $clients = Client::all();
        return response()->json($clients);
    }
    public function lightShow()
    {
        $clients = Client::All()->map(function ($client) {
            return [
                "id" => $client->id,
                "nom" => $client->nom,
            ];
        });
        return response()->json($clients);
    }
    public function listShow()
    {
        $client = Client::with(['actif', 'emplacement', 'poste', 'type_client'])->get()->map(
            function ($client) {
                return [
                    "id" => $client->id,
                    "nom" => $client->nom,
                    'actif' => $client->actif->nom ?? 'Aucun',
                    'emplacement' => $client->emplacement->nom ?? 'Aucun',
                    'poste' => $client->poste->nom ?? 'Aucun',
                    'type_client' => $client->type_client->nom ?? 'Aucun',

                ];
            }
        );
        return response()->json($client);
    }
    public function updateActifs(Request $request, $id)
{
    $client = Client::findOrFail($id);

    $data = $request->all();

    $client->id_actif = $data['selected_rows'];
    $client->save();

    $actifs = Actif::whereIn('id', $request->input('id_actif'))->get();
    foreach ($actifs as $actif) {
        $actif->client_id = $client->id;
        $actif->save();
    }

    return response()->json($client);
}
}
