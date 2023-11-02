<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'commande';

    public function etat()
    {
        return $this->belongsTo(Etat::class, 'id_etat');
    }
}
