<?php

namespace App\Http\Controllers;

use App\Models\Utilisation;
use Illuminate\Http\Request;
use App\Models\Actif;

class UtilisationController extends Controller
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
    public function show(Utilisation $utilisation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utilisation $utilisation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Utilisation $utilisation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utilisation $utilisation)
    {
        //
    }
    public function showAll()
    {
        $utilisations = Utilisation::all();
        return response()->json($utilisations);
    }
    public function lightShow()
    {
        $utilisations = Utilisation::All()->map(function ($utilisation) {
            return [
                "id" => $utilisation->id,
                "nom" => $utilisation->nom,
            ];
        });
        return response()->json($utilisations);
    }
    public function adminShow()
    {
        $utilisations = Utilisation::all()->map(function ($utilisation) {
            return [
                "id" => $utilisation->id,
                "nom" => $utilisation->nom,
            ];
        });

        return response()->json($utilisations);
    }

    public function adminUpdate(Request $request)
    {
        $utilisation = null;

        if ($request->id == "new") {
            $utilisation = new Utilisation();
        } else {
            $utilisation = Utilisation::find($request->id);
        }

        $utilisation->nom = $request->nom;
        $utilisation->save();

        return response()->json($utilisation);
    }

    public function adminDelete(Request $request)
    {
        $new_type = Utilisation::find($request->newId);
        $old_type = Utilisation::find($request->oldId);

        $actifs = Actif::where('id_utilisation', $old_type->id)->get();
        if ($actifs->count() > 0) {
            $actifs->each(function ($actif) use ($new_type) {
                $actif->id_utilisation = $new_type->id;
                $actif->save();
            });
        }

        $old_type->delete();

        return response()->json("ok");
    }
}
