<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class ModeleCommande extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'modele_commande';

    public function modele()
    {
        return $this->belongsTo(Modele::class, 'id_modele');
    }



}
