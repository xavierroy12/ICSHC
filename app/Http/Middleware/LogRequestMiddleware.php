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
        $this->logController->logRequestUnspecific($request);
        error_log($request);
        error_log('before 25');
        return $next($request);
        error_log('after 25');
    }
}
