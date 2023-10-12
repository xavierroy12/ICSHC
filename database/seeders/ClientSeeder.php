<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('client')->insert([
            'nom' => 'Julie Gagnon',
            'id_poste' => 1,
            'id_type_client' => 1,
            'id_emplacement' => 1,
        ]);

        DB::table('client')->insert([
            'nom' => 'Kevin Tremblay',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_emplacement' => 2,
        ]);

        DB::table('client')->insert([
            'nom' => 'Clien NoActif',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_emplacement' => 3,
        ]);

        DB::table('client')->insert([
            [
                'nom' => 'John Doe',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 1,
            ],
            [
                'nom' => 'Jane Smith',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 2,
            ],
            [
                'nom' => 'Bob Johnson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 3,
            ],
            [
                'nom' => 'Alice Brown',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 4,
            ],
            [
                'nom' => 'Mike Davis',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 1,
            ],
            [
                'nom' => 'Emily Wilson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 2,
            ],
            [
                'nom' => 'David Lee',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 4,
            ],
            [
                'nom' => 'Sarah Kim',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 1,
            ],
            [
                'nom' => 'Tom Wilson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 2,
            ],
            [
                'nom' => 'Olivia Davis',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 3,
            ],
            [
                'nom' => 'Chris Brown',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 4,
            ],
            [
                'nom' => 'Emma Johnson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 1,
            ],
            [
                'nom' => 'Alex Wilson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 2,
            ],
            [
                'nom' => 'Grace Lee',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 3,
            ],
            [
                'nom' => 'Luke Kim',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 4,
            ],
            [
                'nom' => 'Chloe Davis',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 1,
            ],
            [
                'nom' => 'Max Brown',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 2,
            ],
            [
                'nom' => 'Lily Johnson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 3,
            ],
            [
                'nom' => 'Jake Wilson',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 4,
            ],
            [
                'nom' => 'Sophia Lee',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 1,
            ],
        ]);
    }
}
