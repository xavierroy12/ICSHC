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
        ProprietaireController $proprietaireController,
        UtilisationController $utilisationController
    ) {
        $dropdowns = [
            'modeles' => $modeleController->showAll(),
            'categories' => $typeModeleController->showAll(),
            'clients' => $clientController->showAll(),
            'emplacements' => $emplacementController->showAll(),
            'statuts' => $statutController->showAll(),
            'proprietaires' => $proprietaireController->showAll(),
            'utilisations' => $utilisationController->showAll(),
        ];

        return response()->json($dropdowns);
    }
}
