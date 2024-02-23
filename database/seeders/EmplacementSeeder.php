<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmplacementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('emplacement')->insert([
            'matricule' => '000',
            'nom' => 'Lieu à déterminer',
            'numero_civique' => '000',
            'adresse' => 'Non-applicable',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '069',
            'nom' => 'École Ligugé',
            'numero_civique' => '194',
            'adresse' => 'rue de l\'Église',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '099',
            'nom' => 'Centre de service de East Angus',
            'numero_civique' => '308',
            'adresse' => 'av. Palmer',
            "est_proprietaire" => true,
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '097',
            'nom' => 'Centre de Service de Coaticook',
            'numero_civique' => '249',
            'adresse' => 'rue Saint-Jean-Baptiste',
            "est_proprietaire" => true,
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '098',
            'nom' => 'Centre de services Lac-Mégantic',
            'numero_civique' => '4730',
            'adresse' => 'rue Dollard',
            "est_proprietaire" => true,
        ]);

        

        DB::table('emplacement')->insert([
            'matricule' => '007',
            'nom' => 'Polyvalente Louis Saint-Laurent',
            'numero_civique' => '188',
            'adresse' => 'rue Kennedy',
        ]);

        DB::table('emplacement')->insert([
            'matricule' =>'021',
            'nom' => 'Centre de formation professionnelle du Haut-Saint-François',
            'numero_civique' => '188',
            'adresse' => 'rue Kennedy',
            "est_proprietaire" => true,
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '011',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'numero_civique' => '188',
            'adresse' => 'rue Kennedy',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '047',
            'nom' => 'École du Parchemin - Côté Couvent',
            'numero_civique' => '162',
            'adresse' => 'rue Saint-Jean Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '048',
            'nom' => 'École du Parchemin - Côté Collège',
            'numero_civique' => '96',
            'adresse' => 'rue Saint-Jacques',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '058',
            'nom' => 'École des Trois-Cantons',
            'numero_civique' => '25',
            'adresse' => 'rue de l\'Église',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '051',
            'nom' => 'École Saint-Camille',
            'numero_civique' => '150',
            'adresse' => 'rue Bibeau',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '067',
            'nom' => 'École Notre-Dame-du-Paradis',
            'numero_civique' => '184',
            'adresse' => 'rue Principale E',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '068',
            'nom' => 'École Notre-Dame-du-Sacré-Cœur',
            'numero_civique' => '211',
            'adresse' => 'rue Saint-Janvier',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '063',
            'nom' => 'École Notre-Dame-de-Lorette',
            'numero_civique' => '44',
            'adresse' => 'rue Notre-Dame Ouest',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '055',
            'nom' => 'École Saint-Paul',
            'numero_civique' => '67',
            'adresse' => 'rue de Ditton',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '023',
            'nom' => 'Centre de formation professionnelle de Coaticook',
            'numero_civique' => '125',
            'adresse' => 'rue Morgan',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '013',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'numero_civique' => '125',
            'adresse' => 'rue Morgan',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '005',
            'nom' => 'École La Frontalière',
            'numero_civique' => '311',
            'adresse' => 'rue Saint-Paul Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '024',
            'nom' => 'École Gendreau',
            'numero_civique' => '102',
            'adresse' => 'rue Cutting',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '039',
            'nom' => 'École Louis-Saint-Laurent',
            'numero_civique' => '6835',
            'adresse' => 'route Louis-St-Laurent',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '027',
            'nom' => 'École Sacré-Coeur',
            'numero_civique' => '211',
            'adresse' => 'rue Saint-Jean-Baptiste',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '030',
            'nom' => 'École Saint-Luc',
            'numero_civique' => '1186',
            'adresse' => 'ch. De Baldwin Mills - Barnstone',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '032',
            'nom' => 'École Sancta-Maria',
            'numero_civique' => '290',
            'adresse' => 'rue Parker',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '037',
            'nom' => 'École de Sainte-Edwidge',
            'numero_civique' => '1427',
            'adresse' => 'chemin Favreau',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '185',
            'nom' => 'École de Ligugé',
            'numero_civique' => '194',
            'adresse' => 'rue de l\'Église',
        ]);
        
        DB::table('emplacement')->insert([
            'matricule' => '036',
            'nom' => 'École Notre-Dame-de-Toutes-Aides',
            'numero_civique' => '127',
            'adresse' => 'rue Principale',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '034',
            'nom' => 'École Saint-Pie-X',
            'numero_civique' => '54',
            'adresse' => 'rue de l\'Église',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '022',
            'nom' => 'Centre de formation professionnelle Le Granit',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '012',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'numero_civique' => '3800',
            'adresse' => 'rue Cousineau',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '079',
            'nom' => 'École d\'Audet',
            'numero_civique' => '242',
            'adresse' => 'rue Principale',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '080',
            'nom' => 'École des Monts-et-Lacs',
            'numero_civique' => '687',
            'adresse' => 'rue Dumas',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '086',
            'nom' => 'École de la Feuille d\'Or',
            'numero_civique' => '215',
            'adresse' => 'rue de l\'Aréna',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '089',
            'nom' => 'École de la Rose-des-Vents',
            'numero_civique' => '475',
            'adresse' => 'route 108',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '091',
            'nom' => 'École de la Source',
            'numero_civique' => '1249',
            'adresse' => 'rue Principale',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '095',
            'nom' => 'École de la Voie-Lactée',
            'numero_civique' => '27',
            'adresse' => 'route de l\'Église',
        ]);


        DB::table('emplacement')->insert([
            'matricule' => '082',
            'nom' => 'École de Sainte-Cécile',
            'numero_civique' => '4570',
            'adresse' => 'rue Principale',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '088',
            'nom' => 'École de Saint-Romain',
            'numero_civique' => '105',
            'adresse' => 'rue du Couvent',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '094',
            'nom' => 'École des Monts-Blancs',
            'numero_civique' => '571',
            'adresse' => 'rue Saint-Augustin',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '084',
            'nom' => 'École des Sommets',
            'numero_civique' => '287',
            'adresse' => 'rue de la Fabrique',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '074',
            'nom' => 'École Notre-Dame-de-Fatima',
            'numero_civique' => '6381',
            'adresse' => 'rue Notre-Dame',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '071',
            'nom' => 'École Sacré-coeur',
            'numero_civique' => '4747',
            'adresse' => 'rue Champlain',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '016',
            'nom' => 'Maison familiale rurale du Granit',
            'numero_civique' => '287',
            'adresse' => 'rue de la Fabrique',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '006',
            'nom' => 'Polyvalente Montignac',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '000',
            'nom' => 'Lieu à déterminer',
            'numero_civique' => '000',
            'adresse' => 'Non-applicable',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '450',
            'nom' => 'Entrepôt East-Angus',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '451',
            'nom' => 'Entrepôt Lac-Mégantic',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '452',
            'nom' => 'Entrepôt Coaticook',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '999',
            'nom' => 'Service informatique',
            'numero_civique' => '0',
            'adresse' => 'n/a',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '998',
            'nom' => 'Utilisateurs Inactifs',
            'numero_civique' => '0',
            'adresse' => 'n/a',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '997',
            'nom' => 'Service Éducatif',
            'numero_civique' => '0',
            'adresse' => 'n/a',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '996',
            'nom' => 'Projet EER',
            'numero_civique' => '0',
            'adresse' => 'n/a',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '995',
            'nom' => 'Équipe volante',
            'numero_civique' => '0',
            'adresse' => 'n/a',
        ]);



        
        


    }
}
