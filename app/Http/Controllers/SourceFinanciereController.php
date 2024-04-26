<?php

namespace App\Http\Controllers;

use App\Models\SourceFinanciere; // Add this line
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SourceFinanciereController extends Controller
{
    public function lightShow()
    {
        $sourceFinanciere = SourceFinanciere::All()->map(function ($sourceFinanciere) {
            return [
                "id" => $sourceFinanciere->id,
                "nom" => $sourceFinanciere->nom,
            ];
        });
        
        Log::info('Source financiere light show: ' . print_r($sourceFinanciere, true));
        
        
        return response()->json($sourceFinanciere);
    }
}
