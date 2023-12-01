<?php

namespace App\Http\Controllers;

use App\Models\TypeModele;
use App\Models\Modele;
use Illuminate\Http\Request;

class TypeModeleController extends Controller
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

    public function add(Request $request){
        $typeModele = new TypeModele();
        $typeModele->nom = $request->nom;
        $typeModele->save();
        return response()->json($typeModele);
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
    public function show(TypeModele $typeModele)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypeModele $typeModele)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypeModele $typeModele)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeModele $typeModele)
    {
        //
    }
    public function showAll()
    {
        $typeModeles = TypeModele::all();
        return response()->json($typeModeles);
    }
    public function lightShow()
    {
        $typeModeles = TypeModele::All()->map(function ($typeModele) {
            return [
                "id" => $typeModele->id,
                "nom" => $typeModele->nom,
            ];
        });
        return response()->json($typeModeles);
    }
    
    public function adminShow()
    {
        $type_modeles = TypeModele::all()->map(function ($type_modele) {
            return [
                "id" => $type_modele->id,
                "nom" => $type_modele->nom,
            ];
        });

        return response()->json($type_modeles);
    }

    public function adminUpdate(Request $request)
    {
        $type_modele = null;

        if ($request->id == "new") {
            $type_modele = new TypeModele();
        } else {
            $type_modele = TypeModele::find($request->id);
        }

        $type_modele->nom = $request->nom;
        $type_modele->save();

        return response()->json($type_modele);
    }

    public function adminDelete(Request $request)
    {
        $new_type = TypeModele::find($request->newId);
        $old_type = TypeModele::find($request->oldId);

        $actifs = Modele::where('id_type_modele', $old_type->id)->get();
        if ($actifs->count() > 0) {
            $actifs->each(function ($actif) use ($new_type) {
                $actif->id_type_modele = $new_type->id;
                $actif->save();
            });
        }

        $old_type->delete();

        return response()->json("ok");
    }
}
