<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('poste')->insert([
            'nom' => 'Étudiant',
        ]);

        DB::table('poste')->insert([
            'nom' => 'Enseignant',
        ]);

        DB::table('poste')->insert([
            'nom' => 'Technicien Informatique',
        ]);

    }
}
