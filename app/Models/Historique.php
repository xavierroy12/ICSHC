<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Historique extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'historique';

}
