<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Http\Controllers\ClientController;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        //We call the method that updates the list of client every day.
        $schedule->call(function () {
            $clientController = new ClientController();
            error_log("Cron job running");
            $result = $clientController->storeListClientScolage();
            error_log("Result is $result");
        })->everyMinute();

        //To test, run php artisan schedule:run after changing daily() to everyMinute()

        
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
