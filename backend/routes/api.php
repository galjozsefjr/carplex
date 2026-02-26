<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ScreeningController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::resource('movies', MovieController::class);
Route::get('/movies', [MovieController::class, 'index']);
Route::get('/movies/{movieId}', [MovieController::class, 'show']);
Route::post('/auth', [AuthController::class, 'login']);
Route::get('/screenings', [ScreeningController::class, 'index']);
Route::get('/screenings/{screeningId}', [ScreeningController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user/current', [AuthController::class, 'getUserProfile']);

    Route::post('/movies', [MovieController::class, 'store']);
    Route::put('/movies/{movieId}', [MovieController::class, 'update']);
    Route::delete('/movies/{movieId}', [MovieController::class, 'destroy']);

    Route::post('/screenings', [ScreeningController::class, 'store']);
    Route::put('/screenings/{screeningId}', [ScreeningController::class, 'update']);
    Route::delete('/screenings/{screeningId}', [ScreeningController::class, 'destroy']);
});
