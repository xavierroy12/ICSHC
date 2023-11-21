<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $table = 'log';

    protected $fillable = [
        'url',
        'method',
        'action',
        'field',
        'old_value',
        'new_value',
        'id_user',
        'id_client',
        'id_actif',
        'id_modele',
        'id_emplacement',
    ];
}
