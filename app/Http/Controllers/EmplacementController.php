<?php

namespace App\Http\Controllers;

use App\Models\Emplacement;
use Illuminate\Http\Request;

class EmplacementController extends Controller
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
    public function show(Emplacement $emplacement)
    {
         // Find the emplacement by ID
        $emplacement = Emplacement::find($emplacement->id);

        // Log the emplacement data to the terminal
        \Log::info($emplacement);
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Emplacement $emplacement)
    {
        //
    }
}
