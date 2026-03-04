<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clienti';
    
    protected $fillable = [
        'user_id', 'ragione_sociale', 'email', 'telefono', 'indirizzo', 'partita_iva'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pratiche()
    {
        return $this->hasMany(Pratica::class);
    }
}