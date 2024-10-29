<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class DemandeTest extends Model
{
    use HasFactory , Notifiable;

    protected $fillable =[
    'balise_id',
    'description',
    'date',
    'heure',
    'statut',];

    public function balise()
    {
        return $this->belongsTo(Balise::class);
    }
}
