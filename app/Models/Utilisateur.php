<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{

    protected $table = 'utilisateur';
    use HasFactory;

    public function emplacement()
    {
        return $this->belongsTo(emplacement::class, 'id_emplacement');
    }
    
    public function role()
    {
        return $this->belongsTo(role::class, 'id_role');
    }
}
