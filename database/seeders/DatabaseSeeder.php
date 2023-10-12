<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            TypeModeleSeeder::class,
            EtatSeeder::class,
            PosteSeeder::class,
            StatutSeeder::class,
            ProprietaireSeeder::class,
            UtilisationSeeder::class,
            EmplacementSeeder::class,
            RoleSeeder::class,
            TypeClientSeeder::class,
            ModeleSeeder::class,
            UtilisateurSeeder::class,
            HistoriqueSeeder::class,
            CommandeSeeder::class,
            ClientSeeder::class,
            ActifSeeder::class,
        ]);
    }
}
