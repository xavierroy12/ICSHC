<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Emplacement;
use App\Models\Role;


class Utilisateur extends Model
{

    protected $table = 'utilisateur';
    public $timestamps = false;
    protected $fillable = [
        'nom',

        'id_role',
        'id_emplacement'
    ];
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
