<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CookieController;
use App\Http\Controllers\UserController;

Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});

//USERS CONTROLLER
Route::apiResource('users', UserController::class);
Route::post('/login', [UserController::class, 'login']);
Route::post('/users', [UserController::class, 'store']);

//Route::put('/cookies/{id}', [CookieController::class, 'updateCookie']);
//Route::delete('/cookies/{cookie}', [CookieController::class, 'destroyCookie']);
//Route::get('/cookies/{id}', [CookieController::class, 'getCookieById']);

//COOKIES CONTROLLER
Route::get('/cookies', [CookieController::class, 'index']);
Route::post('/cookies', [CookieController::class, 'storeCookie']);
Route::put('/cookies/{id}', [CookieController::class, 'updateCookie']);
Route::delete('/cookies/{cookie}', [CookieController::class, 'destroyCookie']);
Route::get('/cookies/{id}', [CookieController::class, 'getCookieById']);

