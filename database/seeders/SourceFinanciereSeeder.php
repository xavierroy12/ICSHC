<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SourceFinanciereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('source_financiere')->insert([
            ['nom' => 'Service informatique'],
            ['nom' => 'Service Éducatif'],
            ['nom' => 'Bon Microsoft'],
            ['nom' => 'Plan numérique'],
        ]);
    }
}
