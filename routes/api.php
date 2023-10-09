<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmplacementController;

use App\Http\Controllers\StatutController;
use App\Http\Controllers\UtilisationController;
use App\Http\Controllers\ProprietaireController;

use App\Http\Controllers\ActifController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EtatController;
use App\Http\Controllers\ModeleController;
use App\Http\Controllers\TypeModeleController;
Route::middleware('throttle:200,1')->group(function () {

    Route::get('/emplacement/{id}', [EmplacementController::class, 'show']);
    Route::get('/emplacements', [EmplacementController::class, 'showAll']);
    Route::get('/emplacements/light', [EmplacementController::class, 'lightShow']);

    Route::get('/actif/{id}', [ActifController::class, 'showActif']);
    Route::get('/actifs', [ActifController::class, 'listShow']);
    Route::get('/actifs/light', [ActifController::class, 'lightShow']);
    Route::get('/actifs/archived', [ActifController::class, 'archivedActifs']);
    Route::post('/actifs', [ActifController::class, 'updateMultiple']);
    Route::post('/actif', [ActifController::class, 'store']);
    Route::post('/actif/{id}', [ActifController::class, 'update']);

    Route::get('/clients', [ClientController::class, 'showAll']);
    Route::get('/clients/light', [ClientController::class, 'lightShow']);

    Route::get('/etats', [EtatController::class, 'showAll']);
    Route::get('/etats/light', [EtatController::class, 'lightShow']);

    Route::get('/modeles', [ModeleController::class, 'showAll']);
    Route::get('/modeles/light', [ModeleController::class, 'lightShow']);
    Route::get('/modele/{id}', [ModeleController::class, 'get']);
    Route::post('/modele/favoris/{id}', [ModeleController::class, 'updateFavoris']);
    Route::post('/modele/{id}', [ModeleController::class, 'update']);

    Route::get('/categories', [TypeModeleController::class, 'showAll']);
    Route::get('/categories/light', [TypeModeleController::class, 'lightShow']);
    Route::post('/categorie', [TypeModeleController::class, 'add']);

    Route::get('/utilisations', [UtilisationController::class, 'showAll']);
    Route::get('/utilisations/light', [UtilisationController::class, 'lightShow']);

    Route::get('/proprietaires', [ProprietaireController::class, 'showAll']);
    Route::get('/proprietaires/light', [ProprietaireController::class, 'lightShow']);

    Route::get('/statuts', [StatutController::class, 'showAll']);
    Route::get('/statuts/light', [StatutController::class, 'lightShow']);
});





Route::post('/login', [LoginController::class, 'checkLogin']);
Route::post('/checkToken', [LoginController::class, 'checkToken']);
Route::get('/utilisateur', [UtilisateurController::class, 'list_json']);