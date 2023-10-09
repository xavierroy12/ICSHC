<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeModeleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_modele')->insert([
            'nom' => 'Portable',
        ]);

        DB::table('type_modele')->insert([
            'nom' => 'Tablette',
        ]);

        DB::table('type_modele')->insert([
            'nom' => 'Projecteur',
        ]);
    }
}
