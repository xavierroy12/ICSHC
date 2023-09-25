<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_client')->insert([
            'nom' => 'Enseignant',
        ]);

        DB::table('type_client')->insert([
            'nom' => 'Personnel',
        ]);

    }
}