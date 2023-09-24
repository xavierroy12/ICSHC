<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModeleCommande extends Model
{
    public function modele()
    {
        return $this->belongsTo(Modele::class, 'id_modele');
    }

    protected $table = 'modele_commande';

    use HasFactory;
}
