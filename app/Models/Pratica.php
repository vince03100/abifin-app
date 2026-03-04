<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pratica extends Model
{
     protected $table = 'pratiche';

    protected $fillable = [
        'cliente_id', 'titolo', 'descrizione', 'stato'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}