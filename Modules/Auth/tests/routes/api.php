<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\Api\ApiLoginController;
use Modules\Auth\Http\Controllers\Api\ApiLogoutController;

Route::prefix('v1')->group(function (): void {
    Route::post('login', ApiLoginController::class)->name('login');

    Route::middleware('auth:api')->group(function (): void {
        Route::get('user', fn (Request $request) => $request->user())->name('user');
        Route::get('profile', fn (Request $request) => $request->user())->name('profile');
        Route::post('logout', ApiLogoutController::class)->name('logout');
    });
});
