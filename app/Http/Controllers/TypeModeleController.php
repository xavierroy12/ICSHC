<?php

namespace App\Http\Controllers;

use App\Models\TypeModele;
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
        $type_modeles = TypeModele::all();
        return response()->json($type_modeles);
    }
}
