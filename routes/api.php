<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EmplacementController;
use App\Http\Controllers\StatutController;
use App\Http\Controllers\UtilisationController;
use App\Http\Controllers\ActifController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EtatController;
use App\Http\Controllers\ModeleController;
use App\Http\Controllers\TypeModeleController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\LogController;
use App\Http\Middleware\LogRequestMiddleware;


Route::middleware(['logrequest', 'throttle:5000,1'])->group(function () {

    Route::get('/emplacement/{id}', [EmplacementController::class, 'show']);
    Route::get('/emplacements', [EmplacementController::class, 'showAll']);
    Route::get('/emplacements/light', [EmplacementController::class, 'lightShow']);

    Route::get('/actif/{id}', [ActifController::class, 'showActif']);
    Route::get('/actifShow', [ActifController::class, 'showall']); //debug
    Route::get('/actifs', [ActifController::class, 'listShow']);
    Route::get('/actifs/light', [ActifController::class, 'lightShow']);
    Route::get('/actifs/archived', [ActifController::class, 'archivedActifs']);
    Route::post('/actifs', [ActifController::class, 'updateMultiple']);
    Route::post('/actif', [ActifController::class, 'store']);
    Route::post('/actif/{id}', [ActifController::class, 'update']);
    Route::post('/actifs/create', [ActifController::class, 'createMultiple']);
    Route::get('/rapport/{rapportName}', [ActifController::class, 'showRapport']);



    Route::get('/client/{id}', [ClientController::class, 'show']);
    Route::get('/clients', [ClientController::class, 'showAll']);
    Route::get('/clients/light', [ClientController::class, 'lightShow']);
    Route::get('/clients/list', [ClientController::class, 'listShow']);
    Route::post('/client/actifs/{id}', [ClientController::class, 'updateActifs']);

    Route::get('/clients/inactif', [ClientController::class, 'getInactifClients']);

    Route::get('/etats', [EtatController::class, 'showAll']);
    Route::get('/etats/light', [EtatController::class, 'lightShow']);


    Route::get('/modeles', [ModeleController::class, 'showAll']);
    Route::get('/modeles/light', [ModeleController::class, 'lightShow']);
    Route::get('/modeles/light/favorite', [ModeleController::class, 'lightShowFavorite']);
    Route::get('/modele/{id}', [ModeleController::class, 'get']);
    Route::post('/modele/favoris/{id}', [ModeleController::class, 'updateFavoris']);
    Route::post('/modele/{id}', [ModeleController::class, 'update']);
    Route::post('/modele', [ModeleController::class, 'createNew']);

    Route::get('/categories', [TypeModeleController::class, 'showAll']);
    Route::get('/categories/light', [TypeModeleController::class, 'lightShow']);
    Route::post('/categorie', [TypeModeleController::class, 'add']);

    Route::get('/utilisations', [UtilisationController::class, 'showAll']);
    Route::get('/utilisations/light', [UtilisationController::class, 'lightShow']);

    Route::get('/proprietaires/light', [EmplacementController::class, 'lightShowProprietaire']);

    Route::get('/utilisateurs', [UtilisateurController::class, 'showAll']);

    Route::get('/statuts', [StatutController::class, 'showAll']);
    Route::get('/statuts/light', [StatutController::class, 'lightShow']);

    Route::post('/login', [LoginController::class, 'checkLogin']);
    Route::post('/checkToken', [LoginController::class, 'checkToken']);

    Route::get('/utilisateur', [UtilisateurController::class, 'list_json']);
    Route::get('/utilisateur/{id}', [UtilisateurController::class, 'show']);
    Route::get('/utilisateurs/list', [UtilisateurController::class, 'showList']);
    Route::post('/utilisateur/{id}', [UtilisateurController::class, 'update']);

    Route::post('/commandeAchat', [CommandeController::class, 'recepCommandeAchat']);
    Route::get('/commandes', [CommandeController::class, 'showAll']);

    Route::get('/roles/light', [RoleController::class, 'lightShow']);

    Route::get('/clientJson', [ClientController::class, 'listClientScolago']);
    Route::get('/clientJsonStore', [ClientController::class, 'storeListClientScolage']);
    Route::get('/EleveJson', [ClientController::class, 'listClientEleve']);

    // Define routes for the SavedFiltersController
    Route::post('/filter/saveFilters', [FilterController::class, 'saveFilters']);
    Route::post('/filter/deleteFilterById', [FilterController::class, 'deleteFilterById']);

    Route::get('/filter/getFilters', [FilterController::class, 'getFilters']);
    Route::get('/filter/getFiltersById', [FilterController::class, 'getFiltersById']);
    Route::get('/filter/getFiltersByLabel', [FilterController::class, 'getFiltersByLabel']);
    Route::get('/filter/checkLabelExists', [FilterController::class, 'checkLabelExists']);

    Route::get('/commandes/list', [CommandeController::class, 'listShow']);
    Route::get('/commande/{numero_commande}', [CommandeController::class, 'show']);
    Route::post('/commande/reception/{numero_commande}', [CommandeController::class, 'reception']);

    Route::get('/clientJson', [ClientController::class, 'listClientScolago']);
    Route::get('/clientJsonStore', [ClientController::class, 'storeListClientScolage']);
    Route::get('/syncAllClients', [ClientController::class, 'syncAllClients']);
    Route::post('/syncAllClients', [ClientController::class, 'syncAllClients']);

    Route::get('/logsJson', [LogController::class, 'listJson']);

    Route::get('historique/{typeItem}/{id_item}', [LogController::class, 'showLogs']);


    Route::get('/emplacements/list', [EmplacementController::class, 'listShow']);
    Route::get('/emplacement/{id}', [EmplacementController::class, 'show']);
    Route::post('/emplacement/{id}', [EmplacementController::class, 'createUpdate']);



    Route::get('/getAllAlerts', [ClientController::class, 'getAllAlerts']);
});




