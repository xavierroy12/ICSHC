<?php

namespace App\Http\Controllers;

use App\Models\Etat;
use Illuminate\Http\Request;

class EtatController extends Controller
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
    public function show(Etat $etat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Etat $etat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Etat $etat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Etat $etat)
    {
        //
    }
    public function showAll()
    {
        $etats = Etat::all();
        return response()->json($etats);
    }
}
