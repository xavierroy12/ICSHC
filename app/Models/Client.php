<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'client';

    public function actif()
    {
        return $this->belongsTo(Actif::class, 'id_actif');

    }

}
