<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmplacementController;
use App\Http\Controllers\ActifController;
use App\Http\Controllers\ActifController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EtatController;
use App\Http\Controllers\ModeleController;
use App\Http\Controllers\TypeModeleController;

Route::get('/emplacement/{id}', [EmplacementController::class, 'show']);
Route::get('/emplacements', [EmplacementController::class, 'showAll']);

Route::get('/actif/{id}', [ActifController::class, 'show']);
Route::get('/actifs', [ActifController::class, 'listShow']);

Route::get('/clients', [ClientController::class, 'showAll']);

Route::get('/etats', [EtatController::class, 'showAll']);

Route::get('/modeles', [ModeleController::class, 'showAll']);

Route::get('/categories', [TypeModeleController::class, 'showAll']);



//ajout actif
Route::post('/actif', [ActifController::class, 'store']);

éém
Route::put('/actif/{id}', [ActifController::class, 'update']);
