<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\Api\ApiLoginController;
use Modules\Auth\Http\Controllers\Api\ApiLogoutController;

Route::prefix('v1')->group(function (): void {
    // First-party token auth (Android/desktop) via Sanctum.
    Route::post('login', ApiLoginController::class)->name('login');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('user', fn (Request $request) => $request->user())->name('user');
        Route::post('logout', ApiLogoutController::class)->name('logout');
    });

    // Third-party OAuth2 access via Passport (api guard).
    Route::middleware('auth:api')->group(function (): void {
        Route::get('profile', fn (Request $request) => $request->user())->name('profile');
    });
});
