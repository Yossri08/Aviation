<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaliseController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\http\Controllers\DemandeTestController;
use App\Http\Controllers\NotificationController;
use Laravel\Ui\AuthCommand;
use BeyondCode\LaravelWebSockets\Facades\WebSocketRouter;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::apiResource('balises', BaliseController::class);
Route::get('/balises', [BaliseController::class, 'index']);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])
    ->middleware('guest')
    ->name('password.email');


Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])
    ->middleware('guest')
    ->name('password.update');

Route::post('/test' , [DemandeTestController::class , 'store']);
Route::get('dtest', [DemandeTestController::class , 'index']);

Route::get('/notifications', function (Request $request) {
    // Récupérer toutes les notifications dans la table 'notifications'
    $notifications = DB::table('notifications')->get();

    if ($notifications->isEmpty()) {
        return response()->json(['message' => 'Aucune notification'], 200);
    }

    return response()->json($notifications, 200);
});

Route::put('/demande-tests/{id}/status', [DemandeTestController::class, 'updateStatus']);




