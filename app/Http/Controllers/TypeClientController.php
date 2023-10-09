<?php

namespace App\Http\Controllers;

use App\Models\TypeClient;
use Illuminate\Http\Request;

class TypeClientController extends Controller
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
    public function show(TypeClient $typeClient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypeClient $typeClient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypeClient $typeClient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeClient $typeClient)
    {
        //
    }
    public function showAll()
    {
        $typeClients = TypeClient::all();
        return response()->json($typeClients);
    }
    public function lightShow()
    {
        $typeClients = TypeClient::All()->map(function ($typeClient) {
            return [
                "id" => $typeClient->id,
                "nom" => $typeClient->nom,
            ];
        });
        return response()->json($typeClients);
    }
}
