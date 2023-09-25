<?php

namespace App\Http\Controllers;

use App\Models\Utilisation;
use Illuminate\Http\Request;

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
}
