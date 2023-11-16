<?php

namespace App\Http\Controllers;

use App\Models\Emplacement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class EmplacementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $emplacement = Emplacement::all();
        return $emplacement;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function getEmplacement($matricule)
    {
        $emplacement = DB::table('emplacement')->where('matricule', $matricule)->first();
        return $emplacement;
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
         // Find the emplacement by ID
         $emplacement = Emplacement::find($id);

        return $emplacement;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Emplacement $emplacement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Emplacement $emplacement)
    {
        //
    }

    public function createUpdate($id, Request $request)
    {
        $emplacement = Emplacement::find($id);
        if ($emplacement == null) {
            $emplacement = new Emplacement();
        }
        $emplacement->nom = $request->nom;
        $emplacement->matricule = $request->matricule;
        $emplacement->adresse = $request->adresse;
        $emplacement->numero_civique = $request->numero_civique;
        $emplacement->save();
        return $emplacement;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Emplacement $emplacement)
    {
        //
    }
    public function showAll()
    {
        $emplacements = Emplacement::all();
        return response()->json($emplacements);
    }
    public function lightShow()
    {
        $emplacements = Emplacement::All()->map(function ($emplacement) {
            return [
                "id" => $emplacement->id,
                "nom" => $emplacement->nom,
            ];
        });
        return response()->json($emplacements);
    }

    public function listShow()
    {
        $emplacements = Emplacement::All()->map(function ($emplacement) {
            return [
                "id" => $emplacement->id,
                "nom" => $emplacement->nom,
                "matricule" => $emplacement->matricule,
                "adresse" => strval($emplacement->numero_civique) . " " . $emplacement->adresse,
            ];
        });
        return response()->json($emplacements);
    }
}
