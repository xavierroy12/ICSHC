<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Modele;

class ModeleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function get($id)
    {
        $modele = Modele::find($id);
        return response()->json($modele);
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
    public function show(Modele $modele)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Modele $modele)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modele $modele)
    {
        //
    }
    public function showAll()
    {
        $modeles = Modele::all();
        return response()->json($modeles);
    }
    public function lightShow()
    {
        $modeles = Modele::All()->map(function ($modele) {
            return [
                "id" => $modele->id,
                "nom" => $modele->nom,
            ];
        });
        return response()->json($modeles);
    }
}
