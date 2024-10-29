<?php

namespace App\Http\Controllers;

use App\Models\DemandeTest;
use Illuminate\Http\Request;

use App\Http\Controllers\DB;
use App\Events\DemandeTestAdded;
use App\Notifications\TestRequestAdded;



class DemandeTestController extends Controller
{
    /*public function index ()
    {
        $demandes = DemandeTest::with('balise')->get();
        return response()->json($demandes);
    }*/

    public function index(Request $request)
    {
        $query = DemandeTest::with('balise');
    
        if ($request->filled('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }
    
        
    
        $test = $query->get();
    
        return response()->json($test);
    }


    public function store(Request $request) 
    {
        $validatedData = $request->validate([
        'balise_id' => 'required|exists:balises,id',
        'description' => 'required|string|max:255',
        'date' => 'required|date',
        'heure' => 'required|date_format:H:i',
        'statut' => 'required|string|in:en_attente,termine', 
    ]);

    $demandeTest = DemandeTest::create($validatedData);

     
    // Envoyer la notification
    $demandeTest->notify(new TestRequestAdded($demandeTest));

   

    // Retourne les données sauvegardées pour vérification
    return response()->json([
        'message' => 'Demande de test créée avec succès.',
        'demandeTest' => $demandeTest
    ], 201);
}

public function  updateStatus(Request $request, $id)
{
    // Valider la requête pour s'assurer que le statut est correct
    $request->validate([
        'statut' => 'required|string|in:en_attente,en_cours,terminé,validé,refusé',
    ]);

    // Récupérer la demande de test par ID
    $demandeTest = DemandeTest::findOrFail($id);

    // Mettre à jour le statut
    $demandeTest->statut = $request->statut;
    $demandeTest->save();

    return response()->json([
        'message' => 'Statut mis à jour avec succès',
        'demandeTest' => $demandeTest
    ], 200);
}

}
