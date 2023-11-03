<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'commande';
    protected $primaryKey = 'numero_commande'; // Add this line


    protected $fillable = [
        'numero_commande',
        'nb_actif',
        'date_commande',
        'id_etat',
        'id_emplacement_prevu'
    ];

    public function etat()
    {
        return $this->belongsTo(Etat::class, 'id_etat');
    }
    public function emplacement()
    {
        return $this->belongsTo(Emplacement::class, 'id_emplacement_prevu');
    }
}
