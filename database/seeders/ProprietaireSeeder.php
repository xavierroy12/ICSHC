<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProprietaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('proprietaire')->insert([
            'nom' => 'Service informatique',
        ]);

        DB::table('proprietaire')->insert([
            'nom' => '068 - École Du Parchemin',
        ]);
    }
}
