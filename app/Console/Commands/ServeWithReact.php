<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ServeWithReact extends Command
{
    protected $signature = 'serve:with-react';

    protected $description = 'Start Laravel and React servers';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Start the Laravel server.
        $this->info('Starting Laravel server...');
        $laravelServer = popen('php artisan serve', 'r');

        // Change directory to the "frontend" subdirectory.
        $frontendPath = base_path('frontend');
        chdir($frontendPath);

        // Start the React server.
        $this->info('Starting React server...');
        $reactServer = popen('npm run dev', 'r');

        // Close the server processes when the command is stopped.
        register_shutdown_function(function () use ($laravelServer, $reactServer) {
            pclose($laravelServer);
            pclose($reactServer);
        });

        // Output any messages from the servers.
        while (!feof($laravelServer)) {
            echo fgets($laravelServer);
        }

        while (!feof($reactServer)) {
            echo fgets($reactServer);
        }
    }
}
