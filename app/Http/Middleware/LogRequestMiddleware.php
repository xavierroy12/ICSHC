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

            error_log('Path: ' . $path . ', Action: ' . $actionName);
            switch ($path) {
                case 'actifs':
                    error_log('in actifs');
                    $this->logController->logActifs($request);
                    break;
                case 'actif':
                    // Handle POST request for /actif
                    error_log('in actif');
                    break;
                case 'actif/':
                    // Handle POST request for /actif/{id}
                    error_log('in actif/');
                    break;
                case '/client/actifs/':
                    // Handle POST request for /client/actifs/{id}
                    error_log('in /client/actifs/');
                    break;
                case 'modele/favoris':
                    // Handle POST request for /modele/favoris/{id}
                    error_log('in modele/favoris');
                    break;
                case 'modele':
                    // Handle POST request for /modele/{id} and /modele
                    error_log('in modele');
                    break;
                case 'modele/':
                    // Handle POST request for /modele/{id} and /modele
                    break;
                case 'categorie':
                    // Handle POST request for /categorie
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
