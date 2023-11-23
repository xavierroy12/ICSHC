<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ActifController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EmplacementController;
use App\Http\Controllers\StatutController;
use App\Http\Controllers\UtilisationController;
use App\Http\Controllers\ProprietaireController;
use App\Http\Controllers\EtatController;
use App\Http\Controllers\ModeleController;
use App\Http\Controllers\TypeModeleController;

class DropdownController extends Controller
{
    public function getAllDropdowns(
        ModeleController $modeleController,
        TypeModeleController $typeModeleController,
        ClientController $clientController,
        EmplacementController $emplacementController,
        StatutController $statutController,
        UtilisationController $utilisationController
    ) {
        $dropdowns = [
            'modeles' => $this->getNames($modeleController->showAll(), 'nom'),
            'categories' => $this->getNames($typeModeleController->showAll(), 'nom'),
            'clients' => $this->getNames($clientController->showAll(), 'nom'),
            'emplacements' => $this->getNames($emplacementController->showAll(), 'nom'),
            'statuts' => $this->getNames($statutController->showAll(), 'nom'),
            'utilisations' => $this->getNames($utilisationController->showAll(), 'nom'),
        ];

        return response()->json($dropdowns);
    }

    private function getNames($data, $key)
    {
        // Use array_column for mapping
        return array_column($data, $key);
    }
}

