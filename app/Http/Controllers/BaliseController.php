<?php

namespace App\Http\Controllers;
use App\Models\Balise;
use App\Http\Controllers\DB;
use App\Models\User;
use Illuminate\Http\Request;


class BaliseController extends Controller
{
    public function index(Request $request)
    {
        $query = Balise::query();
    
        if ($request->filled('code_hexa')) {
            $query->where('code_hexa', 'like', '%' . $request->code_hexa . '%');
        }
    
        if ($request->filled('type')) {
            $query->where('type', 'like', '%' . $request->type . '%');
        }
    
        if ($request->filled('modele')) {
            $query->where('modele', 'like', '%' . $request->modele . '%');
        }
    
        if ($request->filled('fabriquant')) {
            $query->where('fabriquant', 'like', '%' . $request->fabriquant . '%');
        }
    
        $balises = $query->get();
    
        return response()->json($balises);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'code_hexa' => 'required|unique:balises',
            'type' => 'required',
            'modele' => 'required',
            'fabriquant' => 'required',
            'certificat' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            'statut' => 'required|in:actif,inactif',
            'enregistrement' => 'required|date',
        ]);
    
        // Sauvegarder le fichier s'il existe
        $certificatPath = null;
        if ($request->hasFile('certificat')) {
            $certificatPath = $request->file('certificat')->store('certificats', 'public');
        }
    
        try {
            // Créer la balise
            $balise = Balise::create([
                'code_hexa' => $request->code_hexa,
                'type' => $request->type,
                'modele' => $request->modele,
                'fabriquant' => $request->fabriquant,
                'enregistrement' => $request->enregistrement,
                'statut' => $request->statut,
                'certificat' => $certificatPath,
            ]);

           

    
            return response()->json("balise creé avec succès , notif envoyé");  
    
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        }

    public function show($id)
    {
        return Balise::findOrFail($id);  
    }

    public function update(Request $request, $id)
    {
        $balise = Balise::findOrFail($id);
        $balise->update($request->all()); 
    }

    public function destroy($id)
    {
        $balise = Balise::findOrFail($id);
        $balise->delete();  
        return response()->noContent();
    }
}
