<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Roles\Http\Controllers\Api\ApiPermissionController;
use Modules\Roles\Http\Controllers\Api\ApiRoleController;

Route::middleware(['auth:api'])->prefix('v1')->group(function (): void {
    Route::apiResource('roles', ApiRoleController::class);
    Route::post('roles/assign', [ApiRoleController::class, 'assignRoles'])->name('roles.assign');
    Route::get('permissions', [ApiPermissionController::class, 'index'])->name('permissions.index');
});
