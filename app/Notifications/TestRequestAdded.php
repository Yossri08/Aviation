<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\DemandeTest;



class TestRequestAdded extends Notification
{
    use Queueable;

    protected $demandeTest;

    public function __construct(DemandeTest $demandeTest)
    {
        $this->demandeTest = $demandeTest;
    }

    public function via($notifiable)
    {
        return ['database']; // Assurez-vous que vous utilisez 'database'
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Une nouveau test ajouté.',
            'demande_test_id' => $this->demandeTest->id,
            'balise' => $this->demandeTest->balise_id,
            'description' => $this->demandeTest->description,
            'heure' => $this->demandeTest->heure,

            // Ajoutez d'autres données si nécessaire
        ];
    }
}
