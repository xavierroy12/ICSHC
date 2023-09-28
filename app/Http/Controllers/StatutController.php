<?php

namespace App\Http\Controllers;

use App\Models\Statut;
use Illuminate\Http\Request;

class StatutController extends Controller
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
    public function show(Statut $statut)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Statut $statut)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Statut $statut)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Statut $statut)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function showAll()
    {
        $statuts = Statut::all();
        return response()->json($statuts);
    }


}
