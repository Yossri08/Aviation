<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    /**
     * Enregistrement d'un nouvel utilisateur.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        // Envoyer une notification de vérification d'email (si nécessaire)
        // $user->notify(new VerifyEmail);
        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'User registered successfully. Please check your email to verify your account.'], 201);
    }

    /**
     * Connexion d'un utilisateur existant.
     */
    public function login(Request $request)
    {
        // Valider les données de connexion
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Tenter de connecter l'utilisateur avec les informations d'identification fournies
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Invalid login credentials'], 401);
        }

        // Récupérer l'utilisateur connecté
        $user = Auth::user();

          // Vérifier si l'e-mail est vérifié
   

        // Créer un token pour l'utilisateur
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retourner le token d'authentification
        return response()->json([
            'message' => 'User logged in successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    /**
     * Récupérer les informations de l'utilisateur connecté.
     */
    public function getUser(Request $request)
    {    // Récupérer le token de la requête
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }
    
        // Récupérer l'utilisateur authentifié
        $user = $request->user();
    
        // Vérifier si l'utilisateur est bien authentifié
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        return response()->json($user, 200);
    }

    /**
     * Déconnexion de l'utilisateur.
     */
    public function logout(Request $request)
    {
        // Supprimer tous les tokens de l'utilisateur connecté
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'User logged out successfully.'], 200);
    }
}
