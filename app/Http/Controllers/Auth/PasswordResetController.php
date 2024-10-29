<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Auth\Notifications\ResetPassword;

class PasswordResetController extends Controller
{
    /**
     * Envoie un lien de réinitialisation de mot de passe à l'utilisateur.
     */
    public function sendResetLink(Request $request)
    {
        // Validation de l'email
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'L\'adresse e-mail est invalide.',
                'errors' => $validator->errors()
            ], 422);
        }

        // Envoi du lien de réinitialisation de mot de passe
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => 'success', 'message' => __($status)], 200)
            : response()->json(['status' => 'error', 'message' => __($status)], 500);
    }

    /**
     * Réinitialise le mot de passe de l'utilisateur.
     */
    public function resetPassword(Request $request)
    {
        // Validation des champs nécessaires
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'La validation a échoué.',
                'errors' => $validator->errors()
            ], 422);
        }

        // Tentative de réinitialisation de mot de passe
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['status' => 'success', 'message' => __($status)], 200)
            : response()->json(['status' => 'error', 'message' => __($status)], 500);
    }


}
