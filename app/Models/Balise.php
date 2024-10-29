<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balise extends Model
{
    protected $fillable = [
        'code_hexa', 'type', 'modele', 'fabriquant', 'certificat', 'statut', 'enregistrement'
    ];

    public function demandesTest()
    {
        return $this->hasMany(DemandeTest::class);
    }
}
