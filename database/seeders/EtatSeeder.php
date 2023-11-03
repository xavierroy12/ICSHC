<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('etat')->insert([
            'nom' => 'En cours de livraison',
        ]);

        DB::table('etat')->insert([
            'nom' => 'En préparation',
        ]);

        DB::table('etat')->insert([
            'nom' => 'Reçu',
        ]);
    }
}
