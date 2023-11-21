<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Log;
use App\Http\Controllers\LogController;

class LogRequestMiddleware
{

    protected $logController;

    public function __construct(LogController $logController)
    {
        $this->logController = $logController;
    }

    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('post')) {
            $path = str_replace('api/', '', $request->path());
            $actionName = $request->route()->getActionName();
            // Check if path ends with a number
            if (preg_match('/\d+$/', $path)) {
                // Replace the ending number with 'id'
                $path = preg_replace('/\d+$/', 'id', $path);
            }
            error_log('Path: ' . $path . ', Action: ' . $actionName);
            switch ($path) {
                case 'actifs':
                    //Handle post request multiple actifs
                    error_log('in actifs');
                    $this->logController->logActifs($request);
                    break;
                case 'actif':
                    // Handle POST request for actif wich is store
                    error_log('in actif canty figure out wich one');
                    break;
                case 'actif/id':
                    // Handle POST request for /actif/{id}
                    error_log('in actif/id');
                    $this->logController->logActif($request);
                    break;
                case 'client/actifs/id':
                    error_log('in /client/actifs/id');
                    $this->logController->logAssignation($request);
                    break;
                case 'modele/favoris/id':
                    // Handle POST request for /modele/favoris/{id}

                    error_log('in modele/favoris');
                    $this->logController->logFavoris($request);
                    break;
                case 'modele':
                    // Handle POST request for /modele/{id} and /modele
                    error_log('in modele');
                    break;
                case 'modele/id':
                    error_log('in modele/id');
                    $this->logController->logModele($request);

                    break;
                case 'categorie':
                    // Handle POST request for /categorie
                    error_log('in categoirie');
                    $this->logController->logCategorie($request);
                    break;
                case 'utilisateur':
                    // Handle POST request for /utilisateur/{id}
                    break;
                case 'commandeAchat':
                    // Handle POST request for /commandeAchat
                    break;
                case 'commande/reception/':
                    // Handle POST request for /commandeAchat
                    break;
                case 'filter/saveFilters':
                    // Handle POST request for /filter/saveFilters
                    break;
                case 'filter/deleteFilterById':
                    // Handle POST request for /filter/deleteFilterById
                    break;
                default:
                    // Handle other POST requests
                    error_log('in default');
                    break;
            }
        }

        return $next($request);

    }
}
