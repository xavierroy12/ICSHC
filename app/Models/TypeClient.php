<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class TypeClient extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'type_client';

}
